package com.blue.rms.menu.entity

import com.blue.rms.menu.util.enums.ItemStatus
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Inheritance
import jakarta.persistence.InheritanceType
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import org.hibernate.annotations.SQLDelete
import org.hibernate.annotations.SoftDelete
import org.hibernate.annotations.SoftDeleteType
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "menu_items")
@Inheritance(strategy = InheritanceType.JOINED)
@SoftDelete(strategy = SoftDeleteType.DELETED)
abstract class MenuItemEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column(nullable = false)
    var name: String,
    @Column(nullable = true)
    var description: String? = null,
    @Column(precision = 10, scale = 2, nullable = false)
    var basePrice: BigDecimal = BigDecimal.ZERO,
    @Column(nullable = true)
    var imageUrl: String? = null,

    @Enumerated(EnumType.STRING)
    var status: ItemStatus = ItemStatus.AVAILABLE,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    var category: CategoryEntity,
)

@Entity
@Table(name = "dishes")
class DishEntity(
    name: String,
    description: String?,
    basePrice: BigDecimal,
    imageUrl: String?,
    category: CategoryEntity,
    @Column(nullable = true)
    var recipeNotes: String? = null,
    @ManyToMany
    @JoinTable(
        name = "item_option_map",
        joinColumns = [JoinColumn(name = "item_id")],
        inverseJoinColumns = [JoinColumn(name = "group_id")]
    )
    var optionGroups: MutableSet<OptionGroup> = mutableSetOf()
) : MenuItemEntity(name = name, description = description, basePrice = basePrice, imageUrl = imageUrl, category = category)


@Entity
@Table(name = "combos")
class ComboEntity(
    name: String,
    description: String?,
    basePrice: BigDecimal,
    imageUrl: String?,
    category: CategoryEntity,
    var startDate: LocalDateTime?,
    var endDate: LocalDateTime?,

    @OneToMany(mappedBy = "combo", cascade = [CascadeType.ALL])
    val details: MutableList<ComboDetail> = mutableListOf()
) : MenuItemEntity(name = name, description = description, basePrice = basePrice, imageUrl = imageUrl, category = category)

@Entity
class ComboDetail(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne
    @JoinColumn(name = "combo_id")
    val combo: ComboEntity,

    @ManyToOne
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    val quantity: Int
)