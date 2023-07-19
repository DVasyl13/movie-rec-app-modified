package com.app.controller;

import com.app.entity.User;
import com.app.service.MovieService;
import com.app.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<User> getUser(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getUserFromJwt(request));
    }

    @GetMapping("/liked/{movieId}")
    public ResponseEntity<String> doToggleToLiked(HttpServletRequest request,
                                                  @PathVariable String movieId) {
        userService.toggleUserLikedMovie(request, movieId);
        return ResponseEntity.ok(movieId);
    }

    @GetMapping("/ignored/{movieId}")
    public ResponseEntity<String> doToggleToIgnored(HttpServletRequest request,
                                                  @PathVariable String movieId) {
        userService.toggleUserIgnoredMovie(request, movieId);
        return ResponseEntity.ok(movieId);
    }

    @GetMapping("/watched/{movieId}")
    public ResponseEntity<String> doToggleToWatched(HttpServletRequest request,
                                                  @PathVariable String movieId) {
        userService.toggleUserWatchedMovie(request, movieId);
        return ResponseEntity.ok(movieId);
    }
}
