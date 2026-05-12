package com.blue.rms.user.service.impl

import com.blue.rms.user.dto.UserDto
import com.blue.rms.user.entity.UserEntity
import com.blue.rms.user.mapper.toUserDto
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
import com.blue.rms.user.util.enums.UserStatus
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
class UserServiceImpl(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
): UserService {
    override fun createUser(
        email: String,
        password: String,
        firstName: String,
        lastName: String,
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
                email = trimmedEmail,
                hashedPassword = passwordEncoder.encodePassword(password)!!,
                firstName = firstName,
                lastName = lastName,
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

    override fun getAllUsers(pageable: Pageable): Page<UserDto> {
        return userRepository.findAll(pageable).map { it.toUserDto() }
    }

    override fun searchUsers(role: UserRole?, name: String?, pageable: Pageable): Page<UserDto> {
        return userRepository.searchUsersByRoleAndName(role, name, pageable).map { it.toUserDto() }
    }

    @Transactional
    override fun inactiveUser(id: UUID) {
        val user = userRepository.findByIdOrNull(id)
            ?: throw UserNotFoundException()

        if(user.id == requestUserId) {
            throw ForbiddenException("You are not allowed to inactive yourself")
        }

        user.status = UserStatus.INACTIVE
        userRepository.save(user)
    }
}
