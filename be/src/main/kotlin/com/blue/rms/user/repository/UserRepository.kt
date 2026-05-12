package com.blue.rms.user.repository

import com.blue.rms.user.entity.UserEntity
import com.blue.rms.user.util.enums.UserRole
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID

interface UserRepository: JpaRepository<UserEntity, UUID> {
    fun findByEmail(email: String): UserEntity?
    fun existsUserEntityByEmail(email: String): Boolean
    @Query("""
        SELECT u FROM UserEntity u
        WHERE (:role IS NULL OR u.role = :role)
        AND (:name IS NULL OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :name, '%')))
    """)
    fun searchUsersByRoleAndName(
        role: UserRole?,
        name: String?,
        pageable: Pageable
    ): Page<UserEntity>
}
