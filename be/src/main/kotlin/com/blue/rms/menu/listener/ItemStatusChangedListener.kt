package com.blue.rms.menu.listener

import com.blue.rms.menu.dto.websocket.MenuItemStatusUpdatedMessage
import com.blue.rms.menu.dto.websocket.OptionChoiceStatusUpdatedMessage
import com.blue.rms.menu.event.MenuItemStatusChangedEvent
import com.blue.rms.menu.event.OptionChoiceStatusChangedEvent
import org.springframework.context.event.EventListener
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Component

@Component
class ItemStatusChangedListener(
    private val messagingTemplate: SimpMessagingTemplate
) {

    @EventListener
    fun handleMenuItemStatusChangedEvent(event: MenuItemStatusChangedEvent) {
        messagingTemplate.convertAndSend(
            "/topic/menu-item-status",
            MenuItemStatusUpdatedMessage(
                itemId = event.itemId,
                itemName = event.itemName,
                status = event.status
            )
        )
        println("Updated item status")
    }

    @EventListener
    fun handleOptionStatusChangedEvent(event: OptionChoiceStatusChangedEvent) {
        messagingTemplate.convertAndSend(
            "/topic/option-choice-status",
            OptionChoiceStatusUpdatedMessage(
                optionChoiceId = event.optionChoiceId,
                optionChoiceName = event.optionChoiceName,
                status = event.status
            )
        )
    }
}