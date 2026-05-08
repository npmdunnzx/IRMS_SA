package com.blue.rms.user.service

import com.blue.rms.auth.dto.UserDto
import com.blue.rms.user.util.enums.UserRole
import org.springframework.stereotype.Service

interface UserService {
    fun createUser(
        email: String,
        password: String,
        role: UserRole
    ): UserDto

    fun changePassword(
        oldPassword: String,
        newPassword: String
    )
}