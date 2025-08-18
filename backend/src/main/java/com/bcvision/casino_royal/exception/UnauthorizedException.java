package com.bcvision.casino_royal.exception;

/**
 * Custom exception thrown when a request is unauthorized.
 * Used to trigger 401 responses with meaningful messages.
 * 
 * @author Gabriel
 */
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
