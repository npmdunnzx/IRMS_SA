package com.blue.rms.menu.repository

import com.blue.rms.menu.entity.CategoryEntity
import com.blue.rms.menu.entity.DishEntity
import org.springframework.data.jpa.repository.JpaRepository

interface DishRepository: JpaRepository<DishEntity, Long> {
    fun findAllByCategory(category: CategoryEntity): List<DishEntity>
}