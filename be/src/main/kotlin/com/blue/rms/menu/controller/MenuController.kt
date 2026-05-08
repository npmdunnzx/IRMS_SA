package com.blue.rms.menu.controller

import com.blue.rms.menu.dto.UpsertComboRequest
import com.blue.rms.menu.dto.UpsertDishRequest
import com.blue.rms.menu.service.MenuService
import com.blue.rms.menu.util.enums.ItemStatus
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class MenuController(
    private val menuService: MenuService
) {
    @PostMapping("/dish")
    fun createDish(
        @Valid @RequestBody body: UpsertDishRequest
    ) {
        menuService.createDish(
            name = body.name,
            description = body.description,
            price = body.price,
            imageUrl = body.imageUrl,
            categoryId = body.categoryId,
            recipeNotes = body.recipeNotes,
            optionGroupIds = body.optionGroupIds,
        )
    }

    @PostMapping("/combo")
    fun createCombo(
        @Valid @RequestBody body: UpsertComboRequest
    ) {
        menuService.createCombo(
            name = body.name,
            description = body.description,
            price = body.price,
            imageUrl = body.imageUrl,
            categoryId = body.categoryId,
            startDate = body.startDate,
            endDate = body.endDate,
            dishes = body.dishes
        )
    }

    @GetMapping("/dish/all")
    fun getDishes(
        @RequestParam(required = false) category: String?
    ) =
        if (category == null)
            menuService.findAllDishes()
        else
            menuService.findAllDishesByCategory(category)

    @GetMapping("/combo/all")
    fun getCombos(
        @RequestParam(required = false) category: String?
    ) =
        if (category == null)
            menuService.findAllCombos()
        else
            menuService.findAllCombosByCategory(category)

    @DeleteMapping("menu/{itemId}")
    fun delete(@PathVariable itemId: Long) {
        menuService.deleteMenuItemById(itemId)
    }

    @PutMapping("/dish/{id}")
    fun updateDish(
        @PathVariable id: Long,
        @RequestBody request: UpsertDishRequest
    ) = menuService.updateDish(id, request)

    @PutMapping("/combo/{id}")
    fun updateCombo(
        @PathVariable id: Long,
        @RequestBody request: UpsertComboRequest
    ) = menuService.updateCombo(id, request)

    @PatchMapping("/menu/{itemId}/status")
    fun changeMenuItemStatus(
        @PathVariable itemId: Long,
        @RequestParam status: ItemStatus
    ) = menuService.changeMenuItemStatus(itemId, status)
}