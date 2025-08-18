package com.bcvision.casino_royal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * UserDTO
 *
 * Data Transfer Object used to safely expose user data to the frontend.
 * <p>
 * Sensitive fields such as password, account status, or security-related
 * attributes
 * are intentionally excluded. This DTO ensures that only non-sensitive
 * information
 * is serialized and returned in REST responses.
 *
 * <h2>Example JSON response</h2>
 * 
 * <pre>{@code
 * {
 *   "id": 1,
 *   "username": "gabriel",
 *   "email": "gabriel@example.com",
 *   "roles": ["USER", "ADMIN"]
 * }
 * }</pre>
 *
 * Lombok annotations simplify boilerplate:
 * <ul>
 * <li>{@code @Data} → generates getters, setters, toString, equals,
 * hashCode</li>
 * <li>{@code @NoArgsConstructor} → no-args constructor</li>
 * <li>{@code @AllArgsConstructor} → all-args constructor</li>
 * </ul>
 *
 * @author Gabriel
 * @since 2025-08-06
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    /**
     * Unique identifier of the user.
     */
    private Long id;

    /**
     * Username chosen by the user.
     */
    private String username;

    /**
     * Public email of the user.
     */
    private String email;

    /**
     * User roles exposed to the frontend.
     * Typically contains "USER", "ADMIN", etc.
     */
    private Set<String> roles;
}
