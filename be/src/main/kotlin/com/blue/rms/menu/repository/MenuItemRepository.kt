package com.blue.rms.menu.repository

import com.blue.rms.menu.entity.MenuItemEntity
import org.springframework.data.jpa.repository.JpaRepository

interface MenuItemRepository: JpaRepository<MenuItemEntity, Long> {
}