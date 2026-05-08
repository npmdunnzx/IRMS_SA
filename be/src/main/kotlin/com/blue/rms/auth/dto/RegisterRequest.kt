package com.blue.rms.auth.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class RegisterRequest(
    @field:Email(message = "Invalid email address")
    val email: String,
    @field:NotBlank
    val password: String
)
