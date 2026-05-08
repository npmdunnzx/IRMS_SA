package com.blue.rms.menu.mapper

import com.blue.rms.menu.dto.CategoryDto
import com.blue.rms.menu.dto.ComboDetailDto
import com.blue.rms.menu.dto.ComboDto
import com.blue.rms.menu.dto.DishDto
import com.blue.rms.menu.entity.CategoryEntity
import com.blue.rms.menu.entity.ComboDetail
import com.blue.rms.menu.entity.ComboEntity
import com.blue.rms.menu.entity.DishEntity

fun CategoryEntity.toCategoryDto(): CategoryDto = CategoryDto(
    id = this.id,
    name = this.name,
    description = this.description,
)

fun DishEntity.toDishDto(): DishDto {
    return DishDto(
        id = this.id,
        name = this.name,
        description = this.description,
        price = this.basePrice,
        imageUrl = this.imageUrl,
        category = this.category?.toCategoryDto(),
        status = this.status,
        recipeNotes = this.recipeNotes,
        optionGroups = this.optionGroups.map { it.toOptionGroupDto() },
    )
}

fun ComboDetail.toComboDetailDto(): ComboDetailDto {
    return ComboDetailDto(
        id = this.id,
        dish = this.dish.toDishDto(),
        quantity = this.quantity,
    )
}

fun ComboEntity.toComboDto(): ComboDto {
    return ComboDto(
        id = this.id,
        name = this.name,
        description = this.description,
        price = this.basePrice,
        imageUrl = this.imageUrl,
        category = this.category?.toCategoryDto(),
        startDate = this.startDate,
        endDate = this.endDate,
        status = this.status,
        details = this.details
            .map { it.toComboDetailDto() }
    )
}