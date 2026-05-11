package com.blue.rms.exception

class InvalidCredentialsException(message: String? = null): RuntimeException(message ?: "The entered credentials aren't valid.") {
}