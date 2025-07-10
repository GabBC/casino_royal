package com.bcvision.casino_royal.dto;

/**
 * DTO representing login credentials sent by the frontend.
 *
 * Contains email and password fields.
 * 
 * @author Gabriel Benniks
 * @created 2025-07-08
 * @lastModified 2025-07-08
 */
public class LoginRequest {

    private String email;
    private String password;

    /**
     * Gets the email.
     *
     * @return email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email.
     *
     * @param email user email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the password.
     *
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password.
     *
     * @param password user password
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
