package com.blue.rms.menu.dto

import java.math.BigDecimal

data class UpdateOptionChoiceRequest(
    val name: String,
    val surcharge: BigDecimal
)