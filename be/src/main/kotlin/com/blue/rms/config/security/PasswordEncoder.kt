package com.blue.rms.config.security

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component

@Component
class PasswordEncoder {
    private val bcrypt = BCryptPasswordEncoder(12)
    fun encodePassword(password: String) = bcrypt.encode(password)
    fun matches(rawPassword: String, hashedPassword: String) = bcrypt.matches(rawPassword, hashedPassword)
}