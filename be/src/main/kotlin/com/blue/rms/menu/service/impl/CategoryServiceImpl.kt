package com.blue.rms.menu.service.impl

import com.blue.rms.exception.CategoryAlreadyExistsException
import com.blue.rms.exception.CategoryNotFoundException
import com.blue.rms.menu.dto.CategoryDto
import com.blue.rms.menu.entity.CategoryEntity
import com.blue.rms.menu.mapper.toCategoryDto
import com.blue.rms.menu.repository.CategoryRepository
import com.blue.rms.menu.service.CategoryService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CategoryServiceImpl(
    private val categoryRepository: CategoryRepository
): CategoryService {
    override fun createCategory(name: String, description: String?) {
        val category = categoryRepository.findByName(name)
            .firstOrNull()

        if (category != null) {
            throw CategoryAlreadyExistsException()
        }

        categoryRepository.save(
            CategoryEntity(
                name = name,
                description = description
            )
        )
    }

    @Transactional
    override fun updateCategory(id: Long, name: String, description: String?) {
        val category = categoryRepository.findByIdOrNull(id)
            ?: throw CategoryNotFoundException()
        category.name = name
        category.description = description
        categoryRepository.save(category)
    }

    override fun getAllCategories(): List<CategoryDto> {
        return categoryRepository.findAll().map { it.toCategoryDto() }
    }
}