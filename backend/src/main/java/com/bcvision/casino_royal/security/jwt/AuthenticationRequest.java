package com.bcvision.casino_royal.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO representing the authentication request payload.
 * Contains username and password fields.
 * 
 * Used to receive login credentials from the client.
 * 
 * @author Gabriel Benniks
 * @date 2025-07-09
 * @lastModified 2025-07-09
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

    /**
     * The username of the user trying to authenticate.
     */
    private String username;

    /**
     * The password corresponding to the username.
     */
    private String password;

}