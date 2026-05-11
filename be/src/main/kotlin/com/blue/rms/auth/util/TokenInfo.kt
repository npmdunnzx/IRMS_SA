package com.blue.rms.auth.util

import com.blue.rms.user.util.enums.UserRole
import java.util.UUID

data class TokenInfo(
    val userId: UUID,
    val role: UserRole
)