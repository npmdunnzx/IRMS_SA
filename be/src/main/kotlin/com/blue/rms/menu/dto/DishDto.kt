package com.blue.rms.menu.dto

import com.blue.rms.menu.util.enums.ItemStatus
import java.math.BigDecimal

data class DishDto(
    val id: Long,
    val name: String,
    val description: String?,
    val price: BigDecimal,
    val imageUrl: String?,
    val category: CategoryDto?,
    val status: ItemStatus,
    val recipeNotes: String?,
    val optionGroups: List<OptionGroupDto>
)
