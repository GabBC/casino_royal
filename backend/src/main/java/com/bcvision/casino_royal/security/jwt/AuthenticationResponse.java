package com.bcvision.casino_royal.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO representing the authentication response payload.
 * Contains the JWT token issued upon successful authentication.
 * 
 * Used to send the token back to the client.
 * 
 * @author Gabriel Benniks
 * @date 2025-07-09
 * @lastModified 2025-07-09
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    /**
     * The JWT token string to be used by the client for subsequent requests.
     */
    private String token;

}