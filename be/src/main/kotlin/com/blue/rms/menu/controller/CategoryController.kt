package com.blue.rms.menu.controller

import com.blue.rms.menu.dto.UpsertCategoryRequest
import com.blue.rms.menu.service.CategoryService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/category")
class CategoryController(
    private val categoryService: CategoryService
) {

    @PostMapping
    fun create(
        @RequestBody body: UpsertCategoryRequest
    ) = categoryService.createCategory(
        name = body.name,
        description = body.description,
    )

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody body: UpsertCategoryRequest
    ) = categoryService.updateCategory(
        id = id,
        name = body.name,
        description = body.description,
    )

    @GetMapping("/all")
    fun findAll() = categoryService.getAllCategories()

}