package com.blue.rms.menu.dto

import jakarta.validation.constraints.NotBlank
import java.math.BigDecimal

data class UpsertDishRequest(
    @field:NotBlank
    val name: String,
    val description: String?,
    val price: BigDecimal,
    val imageUrl: String?,
    val recipeNotes: String?,
    val categoryId: Long,
    val optionGroupIds: List<Long>,
)
