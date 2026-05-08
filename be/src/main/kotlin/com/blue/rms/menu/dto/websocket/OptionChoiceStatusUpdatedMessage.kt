package com.blue.rms.menu.dto.websocket

import com.blue.rms.menu.util.enums.ItemStatus

data class OptionChoiceStatusUpdatedMessage(
    val optionChoiceId: Long,
    val optionChoiceName: String,
    val status: ItemStatus
)
