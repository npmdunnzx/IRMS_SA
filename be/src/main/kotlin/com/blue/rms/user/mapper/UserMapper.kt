package com.blue.rms.user.mapper

import com.blue.rms.user.dto.UserDto
import com.blue.rms.user.entity.UserEntity

fun UserEntity.toUserDto(): UserDto {
    return UserDto(
        id = this.id!!,
        email = this.email,
        role = this.role.toString(),
        status = this.status,
        userName = "${this.lastName} ${this.firstName}",
    )
}
