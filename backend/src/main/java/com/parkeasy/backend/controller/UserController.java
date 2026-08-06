package com.parkeasy.backend.controller;

import com.parkeasy.backend.dto.request.RegisterRequest;
import com.parkeasy.backend.dto.response.UserResponse;
import com.parkeasy.backend.security.UserPrincipal;
import com.parkeasy.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(userService.getProfile(userPrincipal.getId()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.updateProfile(userPrincipal.getId(), request));
    }
}
