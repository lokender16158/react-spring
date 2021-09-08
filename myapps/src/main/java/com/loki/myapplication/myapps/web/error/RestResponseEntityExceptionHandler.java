package com.loki.myapplication.myapps.web.error;

import com.loki.myapplication.myapps.service.exception.ApplicationAlreadyExistException;
import com.loki.myapplication.myapps.service.exception.FileStorageException;
import com.loki.myapplication.myapps.service.exception.NoApplicationFoundException;
import com.loki.myapplication.myapps.web.util.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    public RestResponseEntityExceptionHandler() {
        super();
    }

    // API

    @Autowired
    private MessageSource messages;

    // 400
    @Override
    protected ResponseEntity<Object> handleBindException(final BindException ex, final HttpHeaders headers, final HttpStatus status, final WebRequest request) {
        //logger.error("400 Status Code", ex);
        final BindingResult result = ex.getBindingResult();
        final GenericResponse bodyOfResponse = new GenericResponse(result.getAllErrors(), "Invalid input");
        //String bodyOfResponse = result.getAllErrors(), "Invalid" + result.getObjectName();
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    // 409
    @ExceptionHandler({ ApplicationAlreadyExistException.class })
    public ResponseEntity<Object> handleAppAlreadyExist(final RuntimeException ex, final WebRequest request) {
       // logger.error("409 Status Code", ex);
        final GenericResponse bodyOfResponse = new GenericResponse("",ex.getMessage());
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    // 409
    @ExceptionHandler({ NoApplicationFoundException.class })
    public ResponseEntity<Object> handleAppNotFound(final RuntimeException ex, final WebRequest request) {
        // logger.error("409 Status Code", ex);
        final GenericResponse bodyOfResponse = new GenericResponse("",ex.getMessage());
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    // 409
    @ExceptionHandler({ FileStorageException.class })
    public ResponseEntity<Object> fileUploadError(final RuntimeException ex, final WebRequest request) {
        // logger.error("409 Status Code", ex);
        final GenericResponse bodyOfResponse = new GenericResponse("","Error in uploading file.");
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Object> handleInternal(final RuntimeException ex, final WebRequest request) {
        logger.error("500 Status Code", ex);
        final GenericResponse bodyOfResponse = new GenericResponse("", "InternalError");
        return new ResponseEntity<>(bodyOfResponse, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
