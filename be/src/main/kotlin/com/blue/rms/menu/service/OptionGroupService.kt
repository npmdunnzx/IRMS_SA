package com.blue.rms.menu.service

import com.blue.rms.menu.dto.CreateOptionChoiceRequest
import com.blue.rms.menu.dto.CreateOptionGroupRequest
import com.blue.rms.menu.dto.OptionGroupDto
import com.blue.rms.menu.dto.UpdateOptionChoiceRequest
import com.blue.rms.menu.dto.UpdateOptionGroupRequest
import com.blue.rms.menu.util.enums.ItemStatus

interface OptionGroupService {
    fun createOptionGroupWithChoices(
        request: CreateOptionGroupRequest
    )

    fun findAll(): List<OptionGroupDto>

    fun updateOptionGroup(id: Long, request: UpdateOptionGroupRequest)
    fun addChoiceToGroup(groupId: Long, request: CreateOptionChoiceRequest)
    fun updateOptionChoice(choiceId: Long, request: UpdateOptionChoiceRequest)
    fun changeChoiceStatus(choiceId: Long, status: ItemStatus)
}