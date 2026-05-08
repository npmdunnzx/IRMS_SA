package com.blue.rms.menu.controller

import com.blue.rms.menu.dto.CreateOptionChoiceRequest
import com.blue.rms.menu.dto.CreateOptionGroupRequest
import com.blue.rms.menu.dto.UpdateOptionChoiceRequest
import com.blue.rms.menu.dto.UpdateOptionGroupRequest
import com.blue.rms.menu.service.OptionGroupService
import com.blue.rms.menu.util.enums.ItemStatus
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
@RequestMapping("/api/option-group")
class OptionGroupController(
    private val optionGroupService: OptionGroupService
) {
    @PostMapping
    fun create(
        @RequestBody body: CreateOptionGroupRequest
    ) = optionGroupService.createOptionGroupWithChoices(body)

    @GetMapping("/all")
    fun findAll() = optionGroupService.findAll()

    @PutMapping("/{id}")
    fun updateGroup(
        @PathVariable id: Long,
        @RequestBody body: UpdateOptionGroupRequest
    ) = optionGroupService.updateOptionGroup(id, body)

    @PostMapping("/{id}/choices")
    fun addChoice(
        @PathVariable id: Long,
        @RequestBody body: CreateOptionChoiceRequest
    ) = optionGroupService.addChoiceToGroup(id, body)

    @PutMapping("/choices/{choiceId}")
    fun updateChoice(
        @PathVariable choiceId: Long,
        @RequestBody body: UpdateOptionChoiceRequest
    ) = optionGroupService.updateOptionChoice(choiceId, body)

    @PatchMapping("/choices/{choiceId}/status")
    fun changeChoiceStatus(
        @PathVariable choiceId: Long,
        @RequestParam status: ItemStatus
    ) = optionGroupService.changeChoiceStatus(choiceId, status)
}