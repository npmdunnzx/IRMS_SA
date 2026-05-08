package com.blue.rms.auth.service

import com.blue.rms.auth.util.TokenInfo
import com.blue.rms.user.util.enums.UserRole
import java.util.UUID

interface JwtService {
    fun validateAccessToken(token: String): Boolean
    fun generateAccessToken(userId: UUID, role: UserRole): String
    fun getUserIdFromToken(token: String): UUID
    fun getTokenInfo(token: String): TokenInfo
}