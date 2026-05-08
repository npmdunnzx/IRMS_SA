package com.blue.rms.menu.mapper

import com.blue.rms.menu.dto.OptionChoiceDto
import com.blue.rms.menu.dto.OptionGroupDto
import com.blue.rms.menu.entity.OptionChoice
import com.blue.rms.menu.entity.OptionGroup

fun OptionGroup.toOptionGroupDto(): OptionGroupDto {
    return OptionGroupDto(
        id = this.id,
        name = this.name,
        isRequired = this.isRequired,
        maxChoices = this.maxChoices,
        choices = this.choices.map { it.toOptionChoiceDto() },
    )
}

fun OptionChoice.toOptionChoiceDto(): OptionChoiceDto {
    return OptionChoiceDto(
        id = this.id,
        name = this.name,
        surcharge = this.surcharge,
        status = this.status,
    )
}