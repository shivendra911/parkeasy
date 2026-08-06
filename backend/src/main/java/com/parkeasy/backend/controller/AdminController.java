package com.parkeasy.backend.controller;

import com.parkeasy.backend.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse> getAdminDashboard() {
        return ResponseEntity.ok(new ApiResponse(true, "Welcome to the Admin Dashboard"));
    }
}
