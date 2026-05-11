package com.blue.rms.exception

import java.time.LocalDateTime

data class ErrorResponse(
    val message: String,
    val code: String,
    val timestamp: LocalDateTime = LocalDateTime.now()
)