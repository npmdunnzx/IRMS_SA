package com.blue.rms.exception

class ForbiddenException(message: String?) : RuntimeException(message ?: "Forbidden")