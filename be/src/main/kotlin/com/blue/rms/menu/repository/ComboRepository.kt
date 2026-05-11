package com.blue.rms.menu.repository

import com.blue.rms.menu.dto.ComboDto
import com.blue.rms.menu.entity.CategoryEntity
import com.blue.rms.menu.entity.ComboEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ComboRepository: JpaRepository<ComboEntity, Long> {
    fun findAllByCategory(category: CategoryEntity): List<ComboEntity>
}