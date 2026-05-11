package com.blue.rms.menu.service

import com.blue.rms.menu.dto.CategoryDto
import org.springframework.stereotype.Service


interface CategoryService {
    fun createCategory(
        name: String,
        description: String?,
    )

    fun updateCategory(
        id: Long, name: String, description: String?
    )

    fun getAllCategories(): List<CategoryDto>
}