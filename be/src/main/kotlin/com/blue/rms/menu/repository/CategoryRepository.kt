package com.blue.rms.menu.repository

import com.blue.rms.menu.entity.CategoryEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface CategoryRepository: JpaRepository<CategoryEntity, Long> {
    fun findByName(name: String): List<CategoryEntity>
}