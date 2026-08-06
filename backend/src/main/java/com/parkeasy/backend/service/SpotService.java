package com.parkeasy.backend.service;

import com.parkeasy.backend.dto.response.SpotResponse;

import java.util.List;

public interface SpotService {
    List<SpotResponse> getSpotsByParking(Long parkingId);
    SpotResponse getSpotById(Long id);
}
