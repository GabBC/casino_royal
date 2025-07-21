package com.bcvision.casino_royal.dto;

import lombok.Data;

/**
 * DTO representing the response to a login request.
 * 
 * Contains success flag, optional token and error message.
 * 
 * @author Gabriel Benniks
 * @created 2025-07-08
 * @lastModified 2025-07-08
 */
@Data
public class LoginResponse {

    private boolean success;
    private String token;
    private String message;

    /**
     * Gets login success status.
     *
     * @return true if login was successful
     */
    public boolean isSuccess() {
        return success;
    }

    /**
     * Sets login success status.
     *
     * @param success true if login successful
     */
    public void setSuccess(boolean success) {
        this.success = success;
    }

    /**
     * Gets the JWT token.
     *
     * @return token
     */
    public String getToken() {
        return token;
    }

    /**
     * Sets the JWT token.
     *
     * @param token JWT token
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * Gets an optional error or info message.
     *
     * @return message
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the message.
     *
     * @param message error or info message
     */
    public void setMessage(String message) {
        this.message = message;
    }
}
