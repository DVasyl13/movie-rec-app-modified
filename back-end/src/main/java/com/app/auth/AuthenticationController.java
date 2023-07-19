package com.app.auth;

import com.app.auth.dto.AuthenticationRequest;
import com.app.auth.dto.AuthenticationResponse;
import com.app.auth.dto.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request,
                                                           final HttpServletRequest httpRequest){
        return ResponseEntity.ok(service.register(request, httpRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/password-recovery")
    public ResponseEntity<String> passwordRecovery(@RequestBody String email){
        return ResponseEntity.ok(service.passwordRecovery(email));
    }



    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request,
                             HttpServletResponse response) throws IOException {
        service.refreshToken(request, response);
    }

    @GetMapping("/register/verifyEmail")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token){
        service.verifyEmail(token);
        return ResponseEntity.ok("Email was verified");
    }
}
