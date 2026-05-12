package com.blue.rms.user.entity

import com.blue.rms.user.util.enums.UserRole
import com.blue.rms.user.util.enums.UserStatus
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Index
import jakarta.persistence.Table
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.Instant
import java.util.UUID

@Entity
@Table(
    name = "users",
    indexes = [
        Index(name = "idx_users_email", columnList = "email")
    ]
)
class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    var id: UUID? = null,
    @Column(nullable = false, unique = true)
    var email: String,
    @Column(nullable = false)
    var hashedPassword: String,
    @Column(nullable = false)
    var firstName: String,
    @Column(nullable = false)
    var lastName: String,
//    @Column(nullable = false)
//    var hasVerifiedEmail: Boolean = false,
    @Enumerated(EnumType.STRING)
    var role: UserRole = UserRole.STAFF,
    @Enumerated(EnumType.STRING)
    var status: UserStatus = UserStatus.ACTIVE,
    @CreationTimestamp
    var createdAt: Instant = Instant.now(),
    @UpdateTimestamp
    var updatedAt: Instant = Instant.now(),
)
