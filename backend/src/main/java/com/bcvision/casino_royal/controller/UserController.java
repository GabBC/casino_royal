package com.bcvision.casino_royal.controller;

import com.bcvision.casino_royal.dto.UserDTO;
import com.bcvision.casino_royal.model.User;
import com.bcvision.casino_royal.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

/**
 * User-facing endpoints (profile).
 * Requires a valid JWT; "sub" MUST be the username.
 */
@RestController
@RequestMapping("/api")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Returns the authenticated user's profile as JSON.
     * <p>
     * HTTP 401 if not authenticated, 404 if user not found.
     * </p>
     */
    @GetMapping(value = "/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional(readOnly = true)
    public ResponseEntity<UserDTO> getProfile(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }

        final String username = authentication.getName(); // ← doit venir du JWT (sub=username)
        log.debug("Loading profile for username={}", username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found: " + username));

        // Map entity → DTO (pas de mapper externe ici)
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        // dto.setRoles(...); // si et seulement si tu as getRoles()

        return ResponseEntity.ok(dto);
    }
}
