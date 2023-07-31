package com.app.service;

import com.app.entity.Movie;
import com.app.entity.User;
import com.app.entity.dto.MovieByUser;
import com.app.exception.UserNotFoundException;
import com.app.exception.WrongTokenException;
import com.app.repository.MovieRepository;
import com.app.repository.UserRepository;
import com.app.security.JwtService;
import com.app.utils.IdMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final JwtService jwtService;

    @Transactional
    public MovieByUser getMovieByUser(HttpServletRequest request, String movieId) {
        var user = getUserFromRequest(request);
        var movie = movieRepository.findById(IdMapper.getLongFromString(movieId))
                .orElseThrow();
        return new MovieByUser(
                user.getLikedMovies().contains(movie),
                user.getWatchedMovies().contains(movie),
                user.getIgnoredMovies().contains(movie)
        );
    }

    @Transactional
    public User getUserFromJwt(HttpServletRequest request) {
        return getUserFromRequest(request);
    }

    @Transactional
    public void toggleUserLikedMovie(HttpServletRequest request, String movieId) {
        toggleMovieSet(movieId, getUserFromRequest(request).getLikedMovies());
    }

    @Transactional
    public void toggleUserWatchedMovie(HttpServletRequest request, String movieId) {
        toggleMovieSet(movieId, getUserFromRequest(request).getWatchedMovies());
    }

    @Transactional
    public void toggleUserIgnoredMovie(HttpServletRequest request, String movieId) {
        toggleMovieSet( movieId, getUserFromRequest(request).getIgnoredMovies());
    }

    private String getUserEmailFromRequest(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        String jwt = header.substring(7);
        return jwtService.extractUsername(jwt);
    }


    private User getUserFromRequest(HttpServletRequest request) {
        String userEmail = getUserEmailFromRequest(request);
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException(userEmail));
    }

    private void toggleMovieSet(String movieId, Set<Movie> movieSet) {
        var movie = movieRepository.findById(IdMapper.getLongFromString(movieId))
                .orElseThrow();

        if (movieSet.contains(movie)) {
            movieSet.remove(movie);
        } else {
            movieSet.add(movie);
        }
    }
}
