package com.bcvision.casino_royal.service;

import com.bcvision.casino_royal.model.User;
import com.bcvision.casino_royal.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * UserService
 *
 * This service handles user-related business logic, particularly fetching user data
 * from the database. It acts as an abstraction between the controller layer and
 * the repository layer.
 *
 * Typically used by controllers like UserController and by security components.
 * 
 * Example usage:
 *   User user = userService.findByUsername("gabriel");
 * 
 * @author Gabriel
 * @since 2025-08-06
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    /**
     * Constructs a UserService with dependency injection of UserRepository.
     * 
     * @param userRepository The repository used to access user data
     */
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Finds a user by their unique username.
     * 
     * @param username The username to search for
     * @return The corresponding User entity
     * @throws IllegalArgumentException if the user does not exist
     */
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
    }
}