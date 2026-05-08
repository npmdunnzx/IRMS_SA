package com.blue.rms.menu.dto.websocket

import com.blue.rms.menu.util.enums.ItemStatus

data class MenuItemStatusUpdatedMessage(
    val itemId: Long,
    val itemName: String,
    val status: ItemStatus
)