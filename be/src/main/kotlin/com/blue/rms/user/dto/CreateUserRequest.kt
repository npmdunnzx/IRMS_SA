package com.blue.rms.user.dto

import com.blue.rms.user.util.enums.UserRole
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class CreateUserRequest(
    @field:Email(message = "Invalid email address")
    val email: String,
    @field:NotBlank
    val password: String,
    val role: UserRole
)