package com.blue.rms.auth.dto

import java.util.UUID

data class UserDto(
    val id: UUID,
    val email: String,
    val role: String
)
