package com.bcvision.casino_royal.service;

import com.bcvision.casino_royal.dto.LoginRequest;
import com.bcvision.casino_royal.dto.LoginResponse;
import com.bcvision.casino_royal.model.User;
import com.bcvision.casino_royal.repository.UserRepository;
import com.bcvision.casino_royal.security.jwt.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Objects;
import java.util.Optional;

/**
 * Authentication service handling credential validation and JWT issuance.
 * <p>
 * This service is stateless and relies on Spring Security crypto utilities to
 * compare raw passwords with stored (BCrypt) hashes. On successful validation,
 * a JWT is generated and returned to the caller.
 *
 * <h2>Design notes</h2>
 * <ul>
 * <li>Uses constructor injection and final fields for immutability.</li>
 * <li>Marked as read-only transactional for repository calls.</li>
 * <li>Does not leak which part of the credentials failed (username vs password)
 * in logs.</li>
 * </ul>
 *
 * @author Gabriel
 * @since 2025-07-08
 * @version 2025-08-18
 */
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * Constructs the authentication service with required dependencies.
     *
     * @param userRepository  repository to load users by username
     * @param passwordEncoder password encoder used to verify credentials
     * @param jwtUtil         JWT helper used to generate signed tokens
     */
    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = Objects.requireNonNull(userRepository, "userRepository is required");
        this.passwordEncoder = Objects.requireNonNull(passwordEncoder, "passwordEncoder is required");
        this.jwtUtil = Objects.requireNonNull(jwtUtil, "jwtUtil is required");
    }

    /**
     * Attempts to authenticate a user and issues a JWT on success.
     *
     * @param loginRequest login payload containing username and raw password
     * @return a {@link LoginResponse} including success flag, message and JWT token
     *         when successful
     */
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest loginRequest) {
        LoginResponse response = new LoginResponse();

        // Basic input validation (avoid NPEs and odd whitespace issues)
        if (loginRequest == null
                || loginRequest.getUsername() == null
                || loginRequest.getPassword() == null) {
            response.setSuccess(false);
            response.setMessage("Requête invalide.");
            log.warn("Login attempt rejected: null or incomplete LoginRequest");
            return response;
        }

        final String username = loginRequest.getUsername().trim();
        final String rawPassword = loginRequest.getPassword();

        if (username.isEmpty() || rawPassword.isEmpty()) {
            response.setSuccess(false);
            response.setMessage("Identifiants manquants.");
            log.warn("Login attempt rejected: empty username or password");
            return response;
        }

        // Look up user by username
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            // For security, do not reveal whether username or password is wrong — but keep
            // UX message in FR.
            response.setSuccess(false);
            response.setMessage("Identifiants invalides.");
            log.warn("Login failed for username='{}': user not found", username);
            return response;
        }

        User user = userOpt.get();

        // Verify password against stored hash
        boolean passwordOk = passwordEncoder.matches(rawPassword, user.getPassword());
        if (!passwordOk) {
            response.setSuccess(false);
            response.setMessage("Identifiants invalides.");
            log.warn("Login failed for username='{}': bad password", username);
            return response;
        }

        // Generate JWT (adapt to your JwtUtil signature if needed)
        // Here we assume generateToken(email, id) as per your previous usage.
        String token = jwtUtil.generateToken(user.getUsername(), user.getId());


        response.setSuccess(true);
        response.setToken(token);
        response.setMessage("Authentification réussie.");

        log.info("Login success for username='{}' (userId={})", username, user.getId());
        return response;
    }
}
