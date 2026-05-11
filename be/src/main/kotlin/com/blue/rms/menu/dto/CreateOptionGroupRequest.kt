package com.blue.rms.menu.dto

import java.math.BigDecimal

data class CreateOptionGroupRequest(
    val name: String,
    val isRequired: Boolean,
    val maxChoices: Int,
    val choices: List<CreateOptionChoiceRequest>
)

data class CreateOptionChoiceRequest(
    val name: String,
    val surcharge: BigDecimal
)