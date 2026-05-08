package com.blue.rms.menu.service

import com.blue.rms.menu.dto.ComboDto
import com.blue.rms.menu.dto.DishDto
import com.blue.rms.menu.dto.DishQuantityDTO
import com.blue.rms.menu.dto.UpsertComboRequest
import com.blue.rms.menu.dto.UpsertDishRequest
import com.blue.rms.menu.entity.OptionGroup
import com.blue.rms.menu.util.enums.ItemStatus
import java.math.BigDecimal
import java.time.LocalDateTime

interface MenuService {
    fun createDish(
        name: String,
        description: String?,
        price: BigDecimal,
        imageUrl: String?,
        recipeNotes: String?,
        categoryId: Long,
        optionGroupIds: List<Long>,
    )
    fun createCombo(
        name: String,
        description: String?,
        price: BigDecimal,
        imageUrl: String?,
        categoryId: Long,
        startDate: LocalDateTime?,
        endDate: LocalDateTime?,
        dishes: List<DishQuantityDTO>
    )

    fun findAllDishesByCategory(category: String): List<DishDto>
    fun findAllDishes(): List<DishDto>

    fun findAllCombosByCategory(category: String): List<ComboDto>
    fun findAllCombos(): List<ComboDto>

    fun deleteMenuItemById(itemId: Long)

    fun updateDish(
        id: Long,
        request: UpsertDishRequest
    ): DishDto

    fun updateCombo(
        id: Long,
        request: UpsertComboRequest
    ): ComboDto

    fun changeMenuItemStatus(itemId: Long, status: ItemStatus)
}