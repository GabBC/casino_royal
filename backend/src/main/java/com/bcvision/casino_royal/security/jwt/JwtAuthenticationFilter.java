package com.bcvision.casino_royal.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;

import com.bcvision.casino_royal.security.CustomUserDetailsService;

/**
 * Filter that intercepts each HTTP request to extract and validate the JWT
 * token.
 * If the token is valid, it sets the Authentication in the SecurityContext.
 * This filter is executed once per request.
 * 
 * @author Gabriel Benniks
 * @date 2025-07-09
 * @lastModified 2025-07-09
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /**
     * Utility class for generating and validating JWT tokens.
     */
    private final JwtUtil jwtUtil;

    /**
     * Service to load user-specific data.
     */
    private final CustomUserDetailsService userDetailsService;

    /**
     * Constructs a new JwtAuthenticationFilter with the given JwtUtil and
     * UserDetailsService.
     * 
     * @param jwtUtil            Utility for JWT token operations
     * @param userDetailsService Service to load user details by username
     */
    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Filters incoming HTTP requests to extract and validate JWT tokens.
     * If a valid token is found, the user is authenticated in the Spring Security
     * context.
     * 
     * @param request     The incoming HTTP request
     * @param response    The HTTP response
     * @param filterChain The filter chain to pass the request/response to the next
     *                    filter
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs during filtering
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        // Retrieve the Authorization header from the HTTP request
        final String authHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // Check if the Authorization header contains a Bearer token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Extract the JWT token by removing the "Bearer " prefix
            jwt = authHeader.substring(7);
            try {
                // Extract the username from the JWT token
                username = jwtUtil.extractUsername(jwt);
            } catch (Exception e) {
                // Token is invalid or expired; optionally log this event
            }
        }

        // If a username was extracted and no authentication exists in the security
        // context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details using the username
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // Validate the token against the user details
            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                // Create an authentication token with user details and authorities
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities());

                // Set additional details for the authentication token
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set the authentication in the SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue the filter chain with the request and response
        filterChain.doFilter(request, response);
    }
}