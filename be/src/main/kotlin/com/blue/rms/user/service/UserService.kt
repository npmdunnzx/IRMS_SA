package com.blue.rms.user.service

import com.blue.rms.user.dto.UserDto
import com.blue.rms.user.util.enums.UserRole
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import java.util.UUID

interface UserService {
    fun createUser(
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        role: UserRole
    ): UserDto

    fun changePassword(
        oldPassword: String,
        newPassword: String
    )
    fun getAllUsers(pageable: Pageable): Page<UserDto>

    fun searchUsers(role: UserRole?, name: String?, pageable: Pageable): Page<UserDto>

    fun inactiveUser(id: UUID)
}
