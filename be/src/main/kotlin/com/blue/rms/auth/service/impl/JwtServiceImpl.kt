package com.blue.rms.auth.service.impl

import com.blue.rms.auth.util.TokenInfo
import com.blue.rms.user.util.enums.UserRole
import com.blue.rms.exception.InvalidTokenException
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.Date
import java.util.UUID
import kotlin.io.encoding.Base64

@Service
class JwtServiceImpl(
    @param:Value($$"${jwt.secret}") private val secret: String
): com.blue.rms.auth.service.JwtService {

    private val secretKey = Keys.hmacShaKeyFor(Base64.Default.decode(secret))

    private val accessTokenValidityMs = 30 * 24 * 60 * 60 * 1000L

    override fun validateAccessToken(token: String): Boolean {
        val claims = parseAllClaims(token)
            ?: return false
        val tokenType = claims["type"] as? String ?: return false
        return tokenType == "access"

    }

    override fun getUserIdFromToken(token: String): UUID {
        val claims = parseAllClaims(token)
            ?: throw InvalidTokenException("Invalid JWT token")
        return UUID.fromString(claims.subject)
    }

    override fun getTokenInfo(token: String): TokenInfo {
        val claims = parseAllClaims(token)
            ?: throw InvalidTokenException("Invalid JWT token")

        val userId = UUID.fromString(claims.subject)
        val role = UserRole.valueOf(
            claims["role"] as? String ?: throw InvalidTokenException("role")
        )

        return TokenInfo(
            userId,
            role
        )
    }

    override fun generateAccessToken(
        userId: UUID,
        role: UserRole
    ): String {
        val now = Date()
        val expiryDate = Date(now.time + accessTokenValidityMs)
        return Jwts.builder()
            .subject("$userId")
            .claim("type", "access")
            .claim("role", role.name)
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(secretKey, Jwts.SIG.HS256)
            .compact()
    }

    private fun parseAllClaims(token: String): Claims? {
        val rawToken = if (token.startsWith("Bearer ")) {
            token.removePrefix("Bearer ")
        } else token

        return try {
            Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(rawToken)
                .payload
        } catch(e: Exception) {
            null
        }
    }

}