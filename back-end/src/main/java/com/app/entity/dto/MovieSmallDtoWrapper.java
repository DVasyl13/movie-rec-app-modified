package com.app.entity.dto;

import java.util.List;

public record MovieSmallDtoWrapper(List<MovieSmallDto> items, String errorMessage) {
}
