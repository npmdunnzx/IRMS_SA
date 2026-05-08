package com.blue.rms.config.seed

import com.blue.rms.user.entity.UserEntity
import com.blue.rms.user.repository.UserRepository
import com.blue.rms.user.util.enums.UserRole
import com.blue.rms.config.security.PasswordEncoder
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class AdminSeeder(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    @param:Value($$"${seeder.admin.email}") private val email: String,
    @param:Value($$"${seeder.admin.password}") private val password: String,
) : CommandLineRunner {

    override fun run(vararg args: String) {
        if (!userRepository.existsUserEntityByEmail(email)) {
            userRepository.save(
                UserEntity(
                    email = email,
                    hashedPassword = passwordEncoder.encodePassword(password)!!,
                    role = UserRole.ADMIN
                )
            )
        }
    }
}