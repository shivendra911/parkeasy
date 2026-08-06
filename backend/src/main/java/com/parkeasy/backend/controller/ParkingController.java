package com.parkeasy.backend.controller;

import com.parkeasy.backend.dto.response.ParkingResponse;
import com.parkeasy.backend.service.ParkingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parking")
@RequiredArgsConstructor
public class ParkingController {

    private final ParkingService parkingService;

    @GetMapping
    public ResponseEntity<List<ParkingResponse>> getAllParkings() {
        return ResponseEntity.ok(parkingService.getAllParkings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParkingResponse> getParkingById(@PathVariable Long id) {
        return ResponseEntity.ok(parkingService.getParkingById(id));
    }
}
