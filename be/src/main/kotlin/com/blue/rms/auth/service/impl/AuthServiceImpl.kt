package com.blue.rms.auth.service.impl

import com.blue.rms.config.security.PasswordEncoder
import com.blue.rms.auth.dto.AuthenticatedUserDto
import com.blue.rms.auth.dto.UserDto
import com.blue.rms.user.entity.UserEntity
import com.blue.rms.auth.mapper.toUserDto
import com.blue.rms.user.repository.UserRepository
import com.blue.rms.auth.service.AuthService
import com.blue.rms.auth.service.JwtService
import com.blue.rms.exception.InvalidCredentialsException
import com.blue.rms.exception.UserAlreadyExistsException
import com.blue.rms.exception.UserNotFoundException
import org.springframework.stereotype.Service

@Service
class AuthServiceImpl(
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService,
    private val userRepository: UserRepository
): AuthService {

    fun register(
        email: String,
        password: String,
    ): UserDto {
        val trimmedEmail = email.trim()
        val user = userRepository.findByEmail(trimmedEmail)

        if(user != null) {
            throw UserAlreadyExistsException()
        }

        return userRepository.save(
            UserEntity(
                email = trimmedEmail,
                hashedPassword = passwordEncoder.encodePassword(password) ?: password
            )
        ).toUserDto()
    }

    override fun login(
        email: String,
        password: String
    ): AuthenticatedUserDto {
        val user = userRepository.findByEmail(email)
            ?: throw UserNotFoundException()

        if(!passwordEncoder.matches(password, user.hashedPassword)) {
            throw InvalidCredentialsException()
        }

        return user.id?.let {
            AuthenticatedUserDto(
                user = user.toUserDto(),
                accessToken = jwtService.generateAccessToken(it, user.role)
            )
        } ?: throw UserNotFoundException()
    }



}