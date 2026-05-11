package com.blue.rms.menu.entity

import com.blue.rms.menu.util.enums.ItemStatus
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToMany
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import java.math.BigDecimal

@Entity
class OptionGroup(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    var name: String,
    var isRequired: Boolean = false,
    var maxChoices: Int = 1,

    @OneToMany(mappedBy = "group", cascade = [CascadeType.ALL])
    val choices: MutableList<OptionChoice> = mutableListOf(),

    @ManyToMany(mappedBy = "optionGroups")
    val dishes: MutableSet<DishEntity> = mutableSetOf()
)

@Entity
class OptionChoice(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    var name: String,
    var surcharge: BigDecimal = BigDecimal.ZERO,

    @Enumerated(EnumType.STRING)
    var status: ItemStatus = ItemStatus.AVAILABLE,

    @ManyToOne
    @JoinColumn(name = "group_id")
    val group: OptionGroup
)