package com.app.exception;

public class WrongTokenException extends RuntimeException{
    public WrongTokenException(String s){
        super(s + " is not valid token");
    }
}