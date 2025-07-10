package com.bcvision.casino_royal.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

/**
 * Utility class for generating and validating JWT tokens.
 * The token contains the userID as a claim at the beginning.
 * 
 * @author Gabriel Benniks
 * @date 2025-07-09
 * @lastModified 2025-07-09
 */
@Component
public class JwtUtil {

    private final String SECRET_KEY = "taCleSecreteTresLongueEtComplexePourLeJWTCasinoRoyal123!";

    private final long JWT_EXPIRATION_MS = 1000 * 60 * 60 * 10; // 10 heures

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(
                java.util.Base64.getEncoder().encodeToString(SECRET_KEY.getBytes()));
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Extracts claims from the JWT token.
     * 
     * @param token JWT token
     * @return Claims object
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Extracts username (subject) from the token.
     * 
     * @param token JWT token
     * @return username
     */
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Extracts the userID claim from the token.
     * 
     * @param token JWT token
     * @return userID as String
     */
    public String extractUserId(String token) {
        return extractAllClaims(token).get("userID", String.class);
    }

    /**
     * Checks if the token is expired.
     * 
     * @param token JWT token
     * @return true if expired, false otherwise
     */
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    /**
     * Generates a JWT token with username and userID.
     * 
     * @param username username of the user
     * @param userId   userID to embed in the token
     * @return JWT token string
     */
    public String generateToken(String username, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userID", userId); // place userID at the start of claims

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_MS))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validates the token against username and expiration.
     * 
     * @param token    JWT token
     * @param username username to match
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token, String username) {
        final String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }
}