package com.bcvision.casino_royal.service;

import com.bcvision.casino_royal.dto.LoginRequest;
import com.bcvision.casino_royal.dto.LoginResponse;
import com.bcvision.casino_royal.model.User;
import com.bcvision.casino_royal.repository.UserRepository;
import com.bcvision.casino_royal.security.jwt.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service responsible for authentication logic.
 * Validates credentials and returns appropriate response.
 * 
 * @author Gabriel Benniks
 * @created 2025-07-08
 * @lastModified 2025-07-21
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    /**
     * Constructor injecting dependencies.
     *
     * @param userRepository  User repository
     * @param passwordEncoder Password encoder
     * @param jwtUtil         JWT utility class
     */
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Handles login by checking credentials.
     *
     * @param loginRequest LoginRequest object
     * @return LoginResponse with success flag and JWT token
     */
    public LoginResponse login(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

        LoginResponse response = new LoginResponse();
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user.getEmail(), user.getId());
                response.setToken(token);

                response.setSuccess(true);
                response.setToken(token);
            } else {
                response.setSuccess(false);
                response.setMessage("Le mot de passe est incorrect");
            }
        } else {
            response.setSuccess(false);
            response.setMessage("Utilisateur non trouvé");
        }

        return response;
    }
}