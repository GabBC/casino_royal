package com.bcvision.casino_royal.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

/**
 * Represents a technical user who can authenticate to access the backend system.
 * This is not a Casino Royal player, but rather an administrator or system-level user.
 */
@Entity
@Table(name = "users") // Avoid conflict with reserved SQL keywords
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
     * User's email.
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * User's role (e.g. ROLE_USER, ROLE_ADMIN).
     */
    @Column(nullable = false)
    private String role;

    /**
     * Date of user creation.
     */
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * Whether the account is active.
     */
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    // ==========================
    // === Getters & Setters ===
    // ==========================

    /**
     * Gets the user's unique ID.
     *
     * @return the ID of the user
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the user's unique ID.
     *
     * @param id the ID to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the username of the user.
     *
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username of the user.
     *
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the hashed password of the user.
     *
     * @return the hashed password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the user's hashed password.
     *
     * @param password the hashed password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets the email address.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the user role.
     */
    public String getRole() {
        return role;
    }

    /**
     * Sets the user role.
     */
    public void setRole(String role) {
        this.role = role;
    }

    /**
     * Gets the creation date.
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Sets the creation date.
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * Checks if the user is enabled.
     */
    public boolean getIsActive() {
        return isActive;
    }

    /**
     * Enables or disables the user.
     */
    public void setIsActive(boolean enabled) {
        this.isActive = enabled;
    }

    

}