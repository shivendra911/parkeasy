package com.parkeasy.backend.controller;

import com.parkeasy.backend.dto.response.SpotResponse;
import com.parkeasy.backend.service.SpotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/spots")
@RequiredArgsConstructor
public class SpotController {

    private final SpotService spotService;

    @GetMapping("/parking/{parkingId}")
    public ResponseEntity<List<SpotResponse>> getSpotsByParking(@PathVariable Long parkingId) {
        return ResponseEntity.ok(spotService.getSpotsByParking(parkingId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpotResponse> getSpotById(@PathVariable Long id) {
        return ResponseEntity.ok(spotService.getSpotById(id));
    }
}
