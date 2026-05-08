package com.blue.rms.auth.service

import com.blue.rms.auth.dto.AuthenticatedUserDto
import com.blue.rms.auth.dto.UserDto
import com.blue.rms.user.util.enums.UserRole

interface AuthService {
    fun login(email: String, password: String): AuthenticatedUserDto
}