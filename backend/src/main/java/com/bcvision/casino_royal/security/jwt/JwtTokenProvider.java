package com.bcvision.casino_royal.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.util.Date;

/**
 * JwtTokenProvider
 *
 * Utility class for generating and validating JWT tokens using the modern JJWT
 * API (v0.11.5).
 * Handles encoding, signing, and decoding of JWTs.
 * 
 * @author Gabriel Benniks
 * @created 2025-07-08
 * @lastModified 2025-07-10
 */
@Component
public class JwtTokenProvider {

    /**
     * Secret key used to sign the JWT, in base64 format.
     */
    @Value("${jwt.secret}")
    private final String jwtSecret; // HS512

    /**
     * Token validity period in milliseconds (24 hours).
     */
    private final long jwtExpirationInMs = 86400000;

    /**
     * Constructor to initialize JwtTokenProvider with the JWT secret key.
     *
     * @param jwtSecret the secret key used to sign and verify JWT tokens, injected
     *                  from application properties
     */
    public JwtTokenProvider(@Value("${jwt.secret}") String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    /**
     * Generates a JWT token for the given username.
     *
     * @param username the username to include in the token
     * @return a signed JWT token string
     */
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Extracts the username (subject) from a JWT token.
     *
     * @param token the JWT token
     * @return the username embedded in the token
     */
    public String getUsernameFromJWT(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Validates a JWT token by checking its signature and expiration.
     *
     * @param token the JWT token
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * Returns the cryptographic key used to sign and validate tokens.
     *
     * @return a {@link Key} generated from the base64 secret
     */
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}