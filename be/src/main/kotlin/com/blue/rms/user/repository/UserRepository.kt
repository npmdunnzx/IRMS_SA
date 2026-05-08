package com.blue.rms.user.repository

import com.blue.rms.user.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserRepository: JpaRepository<UserEntity, UUID> {
    fun findByEmail(email: String): UserEntity?
    fun existsUserEntityByEmail(email: String): Boolean
}