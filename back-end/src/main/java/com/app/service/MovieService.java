package com.app.service;

import com.app.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final RestTemplate restTemplate;
    private final MovieRepository movieRepository;


}
