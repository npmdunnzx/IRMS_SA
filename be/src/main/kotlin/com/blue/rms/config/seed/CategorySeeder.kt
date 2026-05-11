package com.blue.rms.config.seed

import com.blue.rms.menu.entity.CategoryEntity
import com.blue.rms.menu.repository.CategoryRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class CategorySeeder(
    private val categoryRepository: CategoryRepository
): CommandLineRunner {
    override fun run(vararg args: String) {
//        if(categoryRepository.count() == 0L) {
//            val categories = listOf("burger, beverage").map { value ->
//                CategoryEntity(
//                    name = value,
//                    description = "System default"
//                )
//            }
//            categoryRepository.saveAll(categories)
//            println("Saved ${categories.size} categories")
//        }
    }
}