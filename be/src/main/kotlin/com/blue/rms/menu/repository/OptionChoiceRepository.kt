package com.blue.rms.menu.repository

import com.blue.rms.menu.entity.OptionChoice
import org.springframework.data.jpa.repository.JpaRepository

interface OptionChoiceRepository: JpaRepository<OptionChoice, Long> {
}