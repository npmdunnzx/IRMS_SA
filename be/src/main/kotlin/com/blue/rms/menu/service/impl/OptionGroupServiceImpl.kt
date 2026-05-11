package com.blue.rms.menu.service.impl

import com.blue.rms.menu.dto.CreateOptionChoiceRequest
import com.blue.rms.menu.dto.CreateOptionGroupRequest
import com.blue.rms.menu.dto.OptionGroupDto
import com.blue.rms.menu.dto.UpdateOptionChoiceRequest
import com.blue.rms.menu.dto.UpdateOptionGroupRequest
import com.blue.rms.menu.entity.OptionChoice
import com.blue.rms.menu.entity.OptionGroup
import com.blue.rms.menu.event.OptionChoiceStatusChangedEvent
import com.blue.rms.menu.mapper.toOptionGroupDto
import com.blue.rms.menu.repository.OptionChoiceRepository
import com.blue.rms.menu.repository.OptionGroupRepository
import com.blue.rms.menu.service.OptionGroupService
import com.blue.rms.menu.util.enums.ItemStatus
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class OptionGroupServiceImpl(
    private val optionGroupRepository: OptionGroupRepository,
    private val optionChoiceRepository: OptionChoiceRepository,
    private val applicationEventPublisher: ApplicationEventPublisher
): OptionGroupService {

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    override fun createOptionGroupWithChoices(request: CreateOptionGroupRequest) {
        val optionGroup = OptionGroup(
            name = request.name,
            isRequired = request.isRequired,
            maxChoices = request.maxChoices
        )

        request.choices.forEach { choiceRequest ->
            val choice = OptionChoice(
                name = choiceRequest.name,
                surcharge = choiceRequest.surcharge,
                group = optionGroup
            )

            optionGroup.choices.add(choice)
        }

        optionGroupRepository.save(optionGroup)
    }

    override fun findAll(): List<OptionGroupDto> {
        return optionGroupRepository.findAll().map { it.toOptionGroupDto() }
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Transactional
    override fun updateOptionGroup(id: Long, request: UpdateOptionGroupRequest) {
        val group = optionGroupRepository.findById(id)
            .orElseThrow { RuntimeException("OptionGroup not found") }

        group.name = request.name
        group.isRequired = request.isRequired
        group.maxChoices = request.maxChoices

        optionGroupRepository.save(group)
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Transactional
    override fun addChoiceToGroup(groupId: Long, request: CreateOptionChoiceRequest) {
        val group = optionGroupRepository.findById(groupId)
            .orElseThrow { RuntimeException("OptionGroup not found") }

        val choice = OptionChoice(
            name = request.name,
            surcharge = request.surcharge,
            group = group
        )

        group.choices.add(choice)
        optionGroupRepository.save(group)
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Transactional
    override fun updateOptionChoice(choiceId: Long, request: UpdateOptionChoiceRequest) {
        val choice = optionChoiceRepository.findById(choiceId)
            .orElseThrow { RuntimeException("OptionChoice not found") }

        choice.name = request.name
        choice.surcharge = request.surcharge

        optionChoiceRepository.save(choice)
    }

    @Transactional
    override fun changeChoiceStatus(choiceId: Long, status: ItemStatus) {
        val choice = optionChoiceRepository.findById(choiceId)
            .orElseThrow { RuntimeException("OptionChoice not found") }

        choice.status = status

        optionChoiceRepository.save(choice)

        applicationEventPublisher.publishEvent(
            OptionChoiceStatusChangedEvent(
                optionChoiceId = choice.id,
                optionChoiceName = choice.name,
                status = choice.status
            )
        )
    }
}