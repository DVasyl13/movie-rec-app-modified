package com.app.auth;

import com.app.auth.dto.AuthenticationRequest;
import com.app.auth.dto.AuthenticationResponse;
import com.app.auth.dto.RegisterRequest;
import com.app.entity.User;
import com.app.exception.UserAlreadyExistException;
import com.app.exception.WrongPasswordException;
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

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new UserAlreadyExistException(request.email());
        }
        var user = new User(request.username(),
                passwordEncoder.encode(request.password()),
                request.email(), UserRole.USER);
        var savedUser = userRepository.save(user);
        var jwtToken = getJwtToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return new AuthenticationResponse(jwtToken, refreshToken);
    }

    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("User with [" + request.email() + "] was not found"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new WrongPasswordException(request.email());
        }
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        var jwtToken = getJwtToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
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
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validTokens = tokenRepository.findAllValidTokensByUser(user.getId());
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
            var user = userRepository.findByEmail(userEmail)
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

}
