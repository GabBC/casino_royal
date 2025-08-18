package com.bcvision.casino_royal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

/**
 * Global CORS configuration.
 * <p>
 * This configuration defines which frontends are allowed to call the API.
 * Prefer listing explicit origins in production instead of "*".
 */
@Configuration
public class CorsConfig {

    /**
     * Exposes a single CorsConfigurationSource bean used by Spring Security.
     * Spring Security will pick it automatically when http.cors() is enabled.
     *
     * @return the global CORS configuration source
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        // For local dev: allow Angular dev server
        cfg.setAllowedOrigins(List.of(
                "http://localhost:4200",
                "http://127.0.0.1:4200"));
        // If you really need to allow everything during early dev:
        // cfg.addAllowedOriginPattern("*");

        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"));
        cfg.setExposedHeaders(List.of("Authorization"));
        cfg.setAllowCredentials(true); // set to false if using wildcard origins

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply to all endpoints
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}
