package com.blue.rms.auth.mapper

import com.blue.rms.user.entity.UserEntity

fun UserEntity.toUserDto(): com.blue.rms.auth.dto.UserDto {
    return _root_ide_package_.com.blue.rms.auth.dto.UserDto(
        id = this.id!!,
        email = this.email,
        role = this.role.toString()
    )
}