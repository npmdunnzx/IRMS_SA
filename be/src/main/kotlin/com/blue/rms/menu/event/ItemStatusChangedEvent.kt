package com.blue.rms.menu.event

import com.blue.rms.menu.util.enums.ItemStatus

data class MenuItemStatusChangedEvent(
    val itemId: Long,
    val itemName: String,
    val status: ItemStatus
)

data class OptionChoiceStatusChangedEvent(
    val optionChoiceId: Long,
    val optionChoiceName: String,
    val status: ItemStatus
)