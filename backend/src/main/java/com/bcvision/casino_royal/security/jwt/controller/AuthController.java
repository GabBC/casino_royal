package com.bcvision.casino_royal.security.jwt.controller;

import com.bcvision.casino_royal.dto.LoginRequest;
import com.bcvision.casino_royal.dto.LoginResponse;
import com.bcvision.casino_royal.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller responsible for handling authentication requests.
 *
 * @author Gabriel Benniks
 * @created 2025-07-08
 * @lastModified 2025-07-08
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    /**
     * Constructor injecting AuthService.
     *
     * @param authService Auth service
     */
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Handles login requests.
     *
     * @param loginRequest The login request DTO
     * @return Login response containing success status and JWT (if implemented)
     */
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }
}
