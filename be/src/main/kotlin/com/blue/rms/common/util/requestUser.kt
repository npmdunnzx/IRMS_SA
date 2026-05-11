package com.blue.rms.common.util

import com.blue.rms.user.util.enums.UserRole
import com.blue.rms.exception.UnauthorizedException
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import java.util.UUID

val requestUserId: UUID
    get() = SecurityContextHolder.getContext().authentication?.principal as? UUID
        ?: throw UnauthorizedException()

val requestUserRole: UserRole
    get() = SecurityContextHolder
        .getContext()
        .authentication
        ?.getUserRole()
        ?: throw UnauthorizedException()

private fun Authentication.getUserRole(): UserRole {
    val authority = authorities.firstOrNull()?.authority
        ?: throw UnauthorizedException()

    return UserRole.valueOf(authority.removePrefix("ROLE_"))
}