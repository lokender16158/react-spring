package com.loki.myapplication.myapps.service.exception;

public class NoApplicationFoundException  extends RuntimeException{
    public NoApplicationFoundException(String message) {
        super(message);
    }

    public NoApplicationFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
