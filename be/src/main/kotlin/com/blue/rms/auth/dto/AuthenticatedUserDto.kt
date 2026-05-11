package com.blue.rms.auth.dto

data class AuthenticatedUserDto(
    val user: com.blue.rms.auth.dto.UserDto,
    val accessToken: String
)
