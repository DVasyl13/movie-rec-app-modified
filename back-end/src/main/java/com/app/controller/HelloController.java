package com.app.controller;

import com.app.auth.dto.AuthenticationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/hello")
public class HelloController {
    @GetMapping
    public ResponseEntity<Map<String, String>> sayHello() {
        Map<String, String> map = new HashMap<>();
        map.put("say", "hello");
        System.out.println(map);
        return ResponseEntity.ok(map);
    }
}
