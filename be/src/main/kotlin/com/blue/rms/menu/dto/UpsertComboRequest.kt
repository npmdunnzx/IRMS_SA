package com.blue.rms.menu.dto

import jakarta.validation.constraints.NotBlank
import java.math.BigDecimal
import java.time.LocalDateTime

data class UpsertComboRequest(
    @field:NotBlank
    val name: String,
    val description: String?,
    val price: BigDecimal,
    val imageUrl: String?,
    val categoryId: Long,
    val startDate: LocalDateTime?,
    val endDate: LocalDateTime?,
    val dishes: List<DishQuantityDTO>
)
