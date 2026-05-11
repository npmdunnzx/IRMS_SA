package com.blue.rms.user.controller

import com.blue.rms.user.dto.ChangePasswordRequest
import com.blue.rms.user.dto.CreateUserRequest
import com.blue.rms.user.service.UserService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import jakarta.validation.Valid
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
            role = body.role
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

}