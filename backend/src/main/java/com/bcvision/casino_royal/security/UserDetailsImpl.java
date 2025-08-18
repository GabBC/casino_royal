package com.bcvision.casino_royal.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bcvision.casino_royal.model.User;

import java.util.Collection;
import java.util.Collections;

/**
 * Adapter class that wraps a {@link User} entity to implement Spring Security's
 * {@link UserDetails}.
 * This allows Spring Security to handle authentication and authorization based
 * on your custom User entity.
 */
public class UserDetailsImpl implements UserDetails {

    private final User user;

    /**
     * Constructor to create a new instance from a User entity.
     *
     * @param user the user entity to wrap
     */
    public UserDetailsImpl(User user) {
        this.user = user;
    }

    /**
     * Returns the authorities (roles) granted to the current user.
     * 
     * This implementation wraps the user's role as a single
     * {@link GrantedAuthority},
     * allowing Spring Security to perform authorization checks (e.g.,
     * with @PreAuthorize).
     * 
     *
     * <p>
     * <strong>Available roles in the system:</strong>
     * </p>
     * <ul>
     * <li>{@code ROLE_ADMIN} — Full access to all administrative features</li>
     * <li>{@code ROLE_USER} — Default user role, limited to standard features</li>
     * review</li>
     * </ul>
     * 
     * Example: If the user's role is "ROLE_ADMIN", it will be returned as a
     * singleton authority.
     *
     * @return a collection containing the user's single role as a
     *         {@link GrantedAuthority}
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                (GrantedAuthority) () -> user.getRole());
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * @return the hashed password
     */
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return the username
     */
    @Override
    public String getUsername() {
        return user.getUsername();
    }

    /**
     * Indicates whether the user's account has expired.
     *
     * @return true if the account is non-expired, false otherwise
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is locked or unlocked.
     *
     * @return true if the account is not locked, false otherwise
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials (password) have expired.
     *
     * @return true if credentials are valid, false otherwise
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is enabled or disabled.
     *
     * @return true if the user is enabled, false otherwise
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * Returns the wrapped {@link User} entity.
     *
     * @return the internal user
     */
    public User getUser() {
        return user;
    }

    /**
     * Returns the user ID.
     * 
     * @return userId as String
     */
    public Long getUserId() {
        return user.getId();
    }
}