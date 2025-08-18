package com.bcvision.casino_royal.security;

/**
 * Defines the standard roles available in the system.
 * These constants are used for security checks and role assignments.
 * 
 * Naming convention follows Spring Security standards: "ROLE_XXX".
 * 
 * Usage example:
 * - @PreAuthorize("hasRole(Roles.ADMIN)")
 * - user.setRole(Roles.USER)
 * 
 * @author Gabriel
 * @since 2025-08-06
 */
public final class Roles {

    private Roles() {
        // Prevent instantiation
    }

    public static final String ADMIN = "ROLE_ADMIN";
    public static final String USER = "ROLE_USER";
}
