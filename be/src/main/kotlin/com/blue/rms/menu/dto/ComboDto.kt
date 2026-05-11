package com.blue.rms.menu.dto

import com.blue.rms.menu.entity.CategoryEntity
import com.blue.rms.menu.entity.ComboDetail
import com.blue.rms.menu.util.enums.ItemStatus
import jakarta.persistence.CascadeType
import jakarta.persistence.OneToMany
import java.math.BigDecimal
import java.time.LocalDateTime

data class ComboDto(
    val id: Long,
    val name: String,
    val description: String?,
    val price: BigDecimal,
    val imageUrl: String?,
    val category: CategoryDto?,
    val startDate: LocalDateTime?,
    val endDate: LocalDateTime?,
    val status: ItemStatus,
    val details: List<ComboDetailDto> = emptyList()
)
