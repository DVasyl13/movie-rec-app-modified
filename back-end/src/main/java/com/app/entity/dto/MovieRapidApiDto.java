package com.app.entity.dto;

import java.util.List;

public record MovieRapidApiDto(List<String> genre, List<String> imageurl, String imdbid, String title) {
}
