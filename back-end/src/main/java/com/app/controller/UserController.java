package com.app.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    @GetMapping
    public ResponseEntity<String> get(HttpServletRequest request) {
        return ResponseEntity.ok("some");
    }
}
