package com.blue.rms.menu.repository

import com.blue.rms.menu.entity.OptionGroup
import org.springframework.data.jpa.repository.JpaRepository

interface OptionGroupRepository: JpaRepository<OptionGroup, Long> {
}