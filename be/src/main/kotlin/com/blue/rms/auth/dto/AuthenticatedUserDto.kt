package com.blue.rms.auth.dto

import com.blue.rms.user.dto.UserDto

data class AuthenticatedUserDto(
    val user: UserDto,
    val accessToken: String
)
