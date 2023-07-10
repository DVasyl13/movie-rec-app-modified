package com.app.utils;

public class IdMapper {

    public static String getIMDbMovieId(Long id) {
        String numberString = String.format("%07d", id);
        return "tt" + numberString;
    }

    public static String getIMDbPersonId(Long id) {
        String numberString = String.format("%07d", id);
        return "nm" + numberString;
    }

    public static Long getLongFromString(String s) {
        String digitsOnly = s.replaceAll("\\D", "");
        return Long.parseLong(digitsOnly);
    }
}