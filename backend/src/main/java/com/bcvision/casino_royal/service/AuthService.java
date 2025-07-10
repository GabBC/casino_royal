package com.bcvision.casino_royal.service;

import com.bcvision.casino_royal.dto.LoginRequest;
import com.bcvision.casino_royal.dto.LoginResponse;
import com.bcvision.casino_royal.model.User;
import com.bcvision.casino_royal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service responsible for authentication logic.
 * Validates credentials and returns appropriate response.
 * 
 * @author Gabriel Benniks
 * @created 2025-07-08
 * @lastModified 2025-07-08
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor injecting dependencies.
     *
     * @param userRepository User repository
     * @param passwordEncoder Password encoder
     */
    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Handles login by checking credentials.
     *
     * @param loginRequest LoginRequest object
     * @return LoginResponse with success flag and optional token
     */
    public LoginResponse login(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        LoginResponse response = new LoginResponse();
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                response.setSuccess(true);
                response.setMessage("Login successful");
                // TODO: generate and return JWT
                response.setToken("fake-jwt-token");
            } else {
                response.setSuccess(false);
                response.setMessage("Invalid password");
            }
        } else {
            response.setSuccess(false);
            response.setMessage("User not found");
        }

        return response;
    }
}
