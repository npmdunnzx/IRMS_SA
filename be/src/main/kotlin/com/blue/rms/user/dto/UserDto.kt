package com.blue.rms.user.dto

import com.blue.rms.user.util.enums.UserStatus
import java.util.UUID

data class UserDto(
    val id: UUID,
    val email: String,
    val role: String,
    val status: UserStatus,
    val userName: String,
)