package com.app.auth;

import com.app.auth.dto.AuthenticationRequest;
import com.app.auth.dto.AuthenticationResponse;
import com.app.auth.dto.RegisterRequest;
import com.app.entity.User;
import com.app.event.RegistrationCompleteEvent;
import com.app.exception.UserAlreadyExistException;
import com.app.exception.UserIsLockedException;
import com.app.exception.WrongPasswordException;
import com.app.exception.WrongTokenException;
import com.app.repository.UserRepository;
import com.app.security.JwtService;
import com.app.security.token.Token;
import com.app.security.token.TokenRepository;
import com.app.security.token.TokenType;
import com.app.utils.enums.UserRole;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final ApplicationEventPublisher publisher;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request,
                                           final HttpServletRequest httpRequest) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new UserAlreadyExistException(request.email());
        }

        User user = new User(request.username(),
                passwordEncoder.encode(request.password()),
                request.email(), UserRole.USER);
        user.setIsEnable(false);
        User savedUser = userRepository.save(user);
        String jwtToken = getJwtToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        publisher.publishEvent(new RegistrationCompleteEvent(user, jwtToken, getApplicationUrl(httpRequest)));
        return new AuthenticationResponse(jwtToken, refreshToken);
    }

    private String getApplicationUrl(HttpServletRequest request) {
        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
    }

    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("User with [" + request.email() + "] was not found"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new WrongPasswordException(request.email());
        }
        if (user.getIsLocked()) {
            throw new UserIsLockedException("User with [" + request.email() + "] is locked");
        }
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        String jwtToken = getJwtToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return new AuthenticationResponse(jwtToken, refreshToken);
    }

    private String getJwtToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("nma", user.getName());
        return jwtService.generateToken(claims, user);
    }


    private void saveUserToken(User user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        Set<Token> validTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validTokens.isEmpty())
            return;
        validTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validTokens);
    }

    @Transactional
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = new AuthenticationResponse(
                        accessToken,
                        refreshToken
                );
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    @Transactional
    public void verifyEmail(String verificationToken) {
        Token jwtToken = tokenRepository.findByToken(verificationToken).orElseThrow();
        if (jwtToken.isExpired() && jwtToken.isRevoked()) {
            throw new WrongTokenException(verificationToken);
        }
        User user = userRepository.findByEmail(jwtService.extractUsername(jwtToken.getToken())).orElseThrow();
        user.setIsEnable(true);
        userRepository.save(user);
    }
}
