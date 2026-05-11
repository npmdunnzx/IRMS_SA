package com.blue.rms.menu.dto

data class UpdateOptionGroupRequest(
    val name: String,
    val isRequired: Boolean,
    val maxChoices: Int
)