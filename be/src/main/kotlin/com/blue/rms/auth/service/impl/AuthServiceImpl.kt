package com.blue.rms.auth.service.impl

import com.blue.rms.config.security.PasswordEncoder
import com.blue.rms.auth.dto.AuthenticatedUserDto
import com.blue.rms.user.mapper.toUserDto
import com.blue.rms.user.repository.UserRepository
import com.blue.rms.auth.service.AuthService
import com.blue.rms.auth.service.JwtService
import com.blue.rms.exception.ForbiddenException
import com.blue.rms.exception.InvalidCredentialsException
import com.blue.rms.exception.UserNotFoundException
import com.blue.rms.user.util.enums.UserStatus
import org.springframework.stereotype.Service

@Service
class AuthServiceImpl(
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService,
    private val userRepository: UserRepository
): AuthService {

    override fun login(
        email: String,
        password: String
    ): AuthenticatedUserDto {
        val user = userRepository.findByEmail(email)
            ?: throw UserNotFoundException()

        if(!passwordEncoder.matches(password, user.hashedPassword)) {
            throw InvalidCredentialsException()
        }

        if(user.status == UserStatus.INACTIVE) {
            throw ForbiddenException("Your account is inactive")
        }

        return user.id?.let {
            AuthenticatedUserDto(
                user = user.toUserDto(),
                accessToken = jwtService.generateAccessToken(it, user.role)
            )
        } ?: throw UserNotFoundException()
    }



}
