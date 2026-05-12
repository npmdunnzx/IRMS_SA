package com.blue.rms.user.controller

import com.blue.rms.user.dto.UserDto
import com.blue.rms.user.dto.ChangePasswordRequest
import com.blue.rms.user.dto.CreateUserRequest
import com.blue.rms.user.service.UserService
import com.blue.rms.user.util.enums.UserRole
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import jakarta.validation.Valid
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/user")
class UserController(
    private val userService: UserService,
) {

    @PostMapping("/create-user")
    @Operation(
        summary = "Create User",
        description = "Create User with specific role"
    )
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Create successful"),
        ]
    )
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    fun createUser(@Valid @RequestBody body: CreateUserRequest) =
        userService.createUser(
            email = body.email,
            password = body.password,
            role = body.role,
            firstName = body.firstName,
            lastName = body.lastName,
        )

    @PostMapping("/change-password")
    @Operation(
        summary = "Change Password",
        description = "Change Password",
    )
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Change password successful"),
        ]
    )
    fun changePassword(@Valid @RequestBody body: ChangePasswordRequest) =
        userService.changePassword(
            body.oldPassword,
            body.newPassword
        )

    @GetMapping
    @Operation(
        summary = "Get All Users",
        description = "Get a paginated list of all users"
    )
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    fun getAllUsers(pageable: Pageable): Page<UserDto> {
        return userService.getAllUsers(pageable)
    }

    @GetMapping("/search")
    @Operation(
        summary = "Search Users",
        description = "Search users by role and name (first name or last name) with pagination"
    )
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    fun searchUsers(
        @RequestParam(required = false) role: UserRole?,
        @RequestParam(required = false) name: String?,
        pageable: Pageable
    ): Page<UserDto> {
        return userService.searchUsers(role, name, pageable)
    }

    @PatchMapping("/{id}/inactive")
    @Operation(
        summary = "Inactive User",
        description = "Set user status to INACTIVE by User ID"
    )
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "User inactivated successfully"),
            ApiResponse(responseCode = "404", description = "User not found")
        ]
    )
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    fun inactiveUser(@PathVariable id: UUID) {
        userService.inactiveUser(id)
    }

}
