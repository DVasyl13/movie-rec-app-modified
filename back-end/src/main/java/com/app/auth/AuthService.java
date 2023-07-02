package com.app.auth;

import com.app.auth.dto.AuthRequest;
import com.app.auth.dto.AuthenticationResponse;
import com.app.auth.dto.RegisterRequest;
import com.app.entity.User;
import com.app.exception.UserAlreadyExistException;
import com.app.exception.WrongPasswordException;
import com.app.repository.UserRepository;
import com.app.security.JwtService;
import com.app.utils.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new UserAlreadyExistException(request.email());
        }
        var user = new User(request.username(),
                passwordEncoder.encode(request.password()),
                request.email(), UserRole.USER);
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticate(AuthRequest request) {
        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("User with [" + request.email() + "] was not found"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new WrongPasswordException(request.email());
        }
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        var jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken);
    }
}
