package com.parkeasy.backend.service;

import com.parkeasy.backend.dto.response.ParkingResponse;

import java.util.List;

public interface ParkingService {
    List<ParkingResponse> getAllParkings();
    ParkingResponse getParkingById(Long id);
}
