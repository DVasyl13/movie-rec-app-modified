package com.app.exception;

public class UserIsLockedException extends RuntimeException{
    public UserIsLockedException(String s) {
        super(s);
    }
}