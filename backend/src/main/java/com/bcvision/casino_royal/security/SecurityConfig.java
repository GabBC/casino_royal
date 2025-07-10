package com.bcvision.casino_royal.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.bcvision.casino_royal.security.jwt.JwtAuthenticationFilter;

/**
 * Configuration class for Spring Security.
 * 
 * Defines the security filter chain, password encoding, and authentication
 * manager.
 * Also registers the JWT authentication filter in the filter chain.
 * 
 * @author Gabriel Benniks
 * @date 2025-07-09
 * @lastModified 2025-07-09
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Constructor injecting the CustomUserDetailsService and
     * JwtAuthenticationFilter.
     * 
     * @param userDetailsService      service to load user-specific data
     * @param jwtAuthenticationFilter filter to validate JWT tokens on requests
     */
    public SecurityConfig(CustomUserDetailsService userDetailsService,
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Configures the security filter chain for HTTP requests.
     * 
     * @param http the HttpSecurity to configure
     * @return the configured SecurityFilterChain
     * @throws Exception in case of configuration errors
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        http.csrf(csrf -> csrf.disable());

            // Authorize requests
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Allow unauthenticated access to auth endpoints
                .anyRequest().authenticated() // Require authentication for all other requests
            );
            // Add JWT filter before the UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Creates an AuthenticationManager bean configured with the UserDetailsService
     * and password encoder.
     * 
     * @param http the HttpSecurity to get shared objects from
     * @return the AuthenticationManager
     * @throws Exception in case of errors
     */
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);

        authBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());

        return authBuilder.build();
    }

    /**
     * Defines the password encoder bean used to hash passwords.
     * 
     * @return a BCryptPasswordEncoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}