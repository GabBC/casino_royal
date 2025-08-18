package com.bcvision.casino_royal.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * User entity representing a technical user who can authenticate and manage the
 * backend system.
 * This is not a Casino Royal player, but rather an administrator or
 * system-level user.
 *
 * Lombok is used to generate getters, setters, and constructors automatically.
 * The 'users' table name is used to avoid conflicts with SQL reserved keywords.
 * 
 * @author Gabriel
 * @since 2025-08-06
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    /**
     * Unique identifier for the user.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Username used for login.
     * This field must be unique and not null.
     */
    @Column(unique = true, nullable = false)
    private String username;

    /**
     * Hashed password of the user.
     * This field is required and stored in encrypted form.
     */
    @Column(nullable = false)
    private String password;

    /**
     * User's email address.
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * User's role (e.g., ROLE_ADMIN, ROLE_USER).
     */
    @Column(nullable = false)
    private String role;

    /**
     * Timestamp of user creation.
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * Whether the user account is active.
     */
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
}