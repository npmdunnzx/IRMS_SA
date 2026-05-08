package com.blue.rms.user.service.impl

import com.blue.rms.auth.dto.UserDto
import com.blue.rms.user.entity.UserEntity
import com.blue.rms.auth.mapper.toUserDto
import com.blue.rms.common.util.requestUserId
import com.blue.rms.common.util.requestUserRole
import com.blue.rms.config.security.PasswordEncoder
import com.blue.rms.exception.ForbiddenException
import com.blue.rms.exception.InvalidCredentialsException
import com.blue.rms.exception.SamePasswordException
import com.blue.rms.exception.UserAlreadyExistsException
import com.blue.rms.exception.UserNotFoundException
import com.blue.rms.user.repository.UserRepository
import com.blue.rms.user.service.UserService
import com.blue.rms.user.util.enums.UserRole
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
): UserService {
    override fun createUser(
        email: String,
        password: String,
        role: UserRole
    ): UserDto {
        val trimmedEmail = email.trim()
        val user = userRepository.findByEmail(trimmedEmail)

        if(user != null) {
            throw UserAlreadyExistsException()
        }

        if(!canCreateRole(requestUserRole, role)) {
            throw ForbiddenException("Forbidden: cannot assign this role")
        }

        return userRepository.save(
            UserEntity(
                email = email,
                hashedPassword = passwordEncoder.encodePassword(password)!!,
                role = role
            )
        ).toUserDto()
    }

    override fun changePassword(
        oldPassword: String,
        newPassword: String
    ) {
        val user = userRepository.findByIdOrNull(requestUserId)
            ?: throw UserNotFoundException()

        if(!passwordEncoder.matches(oldPassword, user.hashedPassword)) {
            throw InvalidCredentialsException("Wrong old password")
        }

        if(oldPassword == newPassword) {
            throw SamePasswordException()
        }

        userRepository.save(
            user.apply {
                hashedPassword = passwordEncoder.encodePassword(newPassword)!!
            }
        )
    }

    private fun canCreateRole(
        creator: UserRole,
        target: UserRole
    ): Boolean {
        return when(creator) {
            UserRole.ADMIN -> target in listOf(UserRole.STAFF, UserRole.CASHIER, UserRole.MANAGER)
            UserRole.MANAGER -> target in listOf(UserRole.STAFF, UserRole.CASHIER)
            else -> false
        }
    }
}