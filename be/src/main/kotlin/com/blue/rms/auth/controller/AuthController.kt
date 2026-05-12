package com.blue.rms.auth.controller

import com.blue.rms.auth.dto.AuthenticatedUserDto
import com.blue.rms.user.dto.CreateUserRequest
import com.blue.rms.auth.dto.LoginRequest
import com.blue.rms.auth.dto.RegisterRequest
import com.blue.rms.user.dto.UserDto
import com.blue.rms.auth.service.AuthService
import com.blue.rms.auth.service.impl.AuthServiceImpl
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
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {
//    @PostMapping("/register")
//    @Operation(
//        summary = "Register User",
//        description = "Register User"
//    )
//    @ApiResponses(
//        value = [
//            ApiResponse(responseCode = "200", description = "Register successful"),
//        ]
//    )
//    fun register(
//        @Valid @RequestBody body: RegisterRequest
//    ): UserDto {
//        return authService.register(
//            email = body.email,
//            password = body.password
//        )
//    }



    @PostMapping("/login")
    @Operation(
        summary = "Login",
        description = "Login"
    )
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "200", description = "Login successful"),
        ]
    )
    fun login(
        @Valid @RequestBody body: LoginRequest
    ): AuthenticatedUserDto {
        return authService.login(
            email = body.email,
            password = body.password
        )
    }
}