package com.bcvision.casino_royal.dto;

import lombok.Data;

/**
 * DTO representing login credentials sent by the frontend.
 * Contains email and password fields.
 * 
 * @author Gabriel Benniks
 * @created 2025-07-08
 * @lastModified 2025-07-08
 */
@Data
public class LoginRequest {

    private String email;
    private String username;
    private String password;

}
