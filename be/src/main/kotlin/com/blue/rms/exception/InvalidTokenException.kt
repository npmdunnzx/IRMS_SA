package com.blue.rms.exception

class InvalidTokenException(message: String? = null) : RuntimeException(message ?: "Invalid token") {
}