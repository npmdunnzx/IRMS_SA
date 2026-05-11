package com.blue.rms.menu.dto

import com.blue.rms.menu.util.enums.ItemStatus
import java.math.BigDecimal

data class OptionGroupDto(
    val id: Long,
    val name: String,
    val isRequired: Boolean,
    val maxChoices: Int,
    val choices: List<OptionChoiceDto> = emptyList(),
)

data class OptionChoiceDto(
    val id: Long = 0,
    var name: String,
    var surcharge: BigDecimal,
    var status: ItemStatus,
)
