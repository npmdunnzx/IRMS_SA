package com.blue.rms.menu.service.impl

import com.blue.rms.exception.CategoryNotFoundException
import com.blue.rms.exception.ComboNotFoundException
import com.blue.rms.exception.DishNotFoundException
import com.blue.rms.exception.OptionsNotFoundException
import com.blue.rms.menu.dto.ComboDto
import com.blue.rms.menu.dto.DishDto
import com.blue.rms.menu.dto.DishQuantityDTO
import com.blue.rms.menu.dto.UpsertComboRequest
import com.blue.rms.menu.dto.UpsertDishRequest
import com.blue.rms.menu.entity.ComboDetail
import com.blue.rms.menu.entity.ComboEntity
import com.blue.rms.menu.entity.DishEntity
import com.blue.rms.menu.event.MenuItemStatusChangedEvent
import com.blue.rms.menu.mapper.toComboDto
import com.blue.rms.menu.mapper.toDishDto
import com.blue.rms.menu.repository.CategoryRepository
import com.blue.rms.menu.repository.ComboRepository
import com.blue.rms.menu.repository.DishRepository
import com.blue.rms.menu.repository.MenuItemRepository
import com.blue.rms.menu.repository.OptionGroupRepository
import com.blue.rms.menu.service.MenuService
import com.blue.rms.menu.util.enums.ItemStatus
import org.springframework.context.ApplicationEventPublisher
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
class MenuServiceImpl(
    private val dishRepository: DishRepository,
    private val categoryRepository: CategoryRepository,
    private val comboRepository: ComboRepository,
    private val menuItemRepository: MenuItemRepository,
    private val optionGroupRepository: OptionGroupRepository,
    private val applicationEventPublisher: ApplicationEventPublisher
): MenuService {

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    @Transactional
    override fun createDish(
        name: String,
        description: String?,
        price: BigDecimal,
        imageUrl: String?,
        recipeNotes: String?,
        categoryId: Long,
        optionGroupIds: List<Long>,
    ) {
        val category = categoryRepository
            .findByIdOrNull(categoryId)
            ?: throw CategoryNotFoundException()

        val dish = DishEntity(
            name = name,
            description = description,
            basePrice = price,
            imageUrl = imageUrl,
            recipeNotes = recipeNotes,
            category = category
        )

        if (optionGroupIds.isNotEmpty()) {
            val optionGroups = optionGroupRepository.findAllById(optionGroupIds)

            if (optionGroups.size != optionGroupIds.size) {
                throw OptionsNotFoundException()
            }

            dish.optionGroups.addAll(optionGroups)
        }

        dishRepository.save(dish)
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    override fun createCombo(
        name: String,
        description: String?,
        price: BigDecimal,
        imageUrl: String?,
        categoryId: Long,
        startDate: LocalDateTime?,
        endDate: LocalDateTime?,
        dishes: List<DishQuantityDTO>
    ) {
        val category = categoryRepository
            .findByIdOrNull(categoryId)
            ?: throw CategoryNotFoundException()

        val newCombo = ComboEntity(
            name = name,
            description = description,
            basePrice = price,
            imageUrl = imageUrl,
            startDate = startDate,
            endDate = endDate,
            category = category,
        )

        dishes.forEach { value ->
            val dish = dishRepository.findByIdOrNull(value.dishId)
                ?: throw DishNotFoundException()

            val detail = ComboDetail(
                combo = newCombo,
                dish = dish,
                quantity = value.quantity
            )

            newCombo.details.add(detail)
        }

        comboRepository.save(newCombo)
    }

    override fun findAllDishesByCategory(
        category: String
    ): List<DishDto> {
        val category = categoryRepository
            .findByName(category)
            .firstOrNull()
            ?: throw CategoryNotFoundException()

        return dishRepository.findAllByCategory(category).map { it.toDishDto() }
    }

    override fun findAllDishes(): List<DishDto> {
        return dishRepository.findAll().map { it.toDishDto() }
    }

    override fun findAllCombosByCategory(
        category: String
    ): List<ComboDto> {
        val category = categoryRepository
            .findByName(category)
            .firstOrNull()
            ?: throw CategoryNotFoundException()

        return comboRepository.findAllByCategory(category).map { it.toComboDto() }
    }

    override fun findAllCombos(): List<ComboDto> {
        return comboRepository.findAll().map { it.toComboDto() }
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    override fun deleteMenuItemById(itemId: Long) {
        menuItemRepository.deleteById(itemId)
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    override fun updateDish(
        id: Long,
        request: UpsertDishRequest
    ): DishDto {
        val dish = dishRepository.findByIdOrNull(id)
            ?: throw DishNotFoundException()

        val category = categoryRepository
            .findByIdOrNull(request.categoryId)
            ?: throw CategoryNotFoundException()

        dish.name = request.name
        dish.basePrice = request.price
        dish.category = category
        dish.description = request.description
        dish.recipeNotes = request.recipeNotes
        dish.imageUrl = request.imageUrl

        dish.optionGroups.clear()
        request.optionGroupIds.forEach { groupId ->
            val optionGroup = optionGroupRepository.findByIdOrNull(groupId)
                ?: throw OptionsNotFoundException()

            dish.optionGroups.add(optionGroup)
        }

        return dishRepository.save(dish).toDishDto()
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    override fun updateCombo(
        id: Long,
        request: UpsertComboRequest
    ): ComboDto {
        val combo = comboRepository.findByIdOrNull(id)
            ?: throw ComboNotFoundException()

        val category = categoryRepository
            .findByIdOrNull(request.categoryId)
            ?: throw CategoryNotFoundException()

        combo.name = request.name
        combo.basePrice = request.price
        combo.category = category
        combo.description = request.description
        combo.endDate = request.endDate
        combo.imageUrl = request.imageUrl
        combo.startDate = request.startDate

        combo.details.clear()
        request.dishes.forEach { value ->
            val dish = dishRepository.findByIdOrNull(value.dishId)
                ?: throw DishNotFoundException()

            val detail = ComboDetail(
                combo = combo,
                dish = dish,
                quantity = value.quantity
            )

            combo.details.add(detail)
        }

        return comboRepository.save(combo).toComboDto()
    }

    override fun changeMenuItemStatus(itemId: Long, status: ItemStatus) {
        val menuItem = menuItemRepository.findByIdOrNull(itemId)
            ?: throw DishNotFoundException()//Todo: fix raised error

        menuItem.status = status
        menuItemRepository.save(menuItem)

        applicationEventPublisher.publishEvent(
            MenuItemStatusChangedEvent(
                itemId = menuItem.id,
                status = menuItem.status,
                itemName = menuItem.name
            )
        )
    }

}