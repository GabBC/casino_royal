package com.bcvision.casino_royal.repository;

import com.bcvision.casino_royal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository interface for managing {@link User} entities.
 * Provides basic CRUD operations and custom query methods using Spring Data JPA
 * conventions.
 * 
 * Commonly used for:
 * - Authentication (via username or email)
 * - Account management (update, enable/disable, etc.)
 * 
 * @author Gabriel Benniks
 * @created 2025-07-08
 * @lastModified 2025-08-06
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by their username.
     *
     * @param username the username to look up
     * @return an Optional containing the User if found, or empty if not
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds a user by their email.
     *
     * @param email the email to look up
     * @return an Optional containing the User if found, or empty if not
     */
    Optional<User> findByEmail(String email);
}