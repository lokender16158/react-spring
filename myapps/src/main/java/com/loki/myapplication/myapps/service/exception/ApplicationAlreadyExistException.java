package com.loki.myapplication.myapps.service.exception;

public class ApplicationAlreadyExistException extends RuntimeException{
    public ApplicationAlreadyExistException(String message) {
        super(message);
    }

    public ApplicationAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
