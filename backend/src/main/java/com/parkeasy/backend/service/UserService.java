package com.parkeasy.backend.service;

import com.parkeasy.backend.dto.request.LoginRequest;
import com.parkeasy.backend.dto.request.RegisterRequest;
import com.parkeasy.backend.dto.response.AuthResponse;
import com.parkeasy.backend.dto.response.UserResponse;

public interface UserService {
    AuthResponse login(LoginRequest request);
    AuthResponse register(RegisterRequest request);
    UserResponse getProfile(Long userId);
    UserResponse updateProfile(Long userId, RegisterRequest request); // reusing RegisterRequest for simplicity, without password required
}
