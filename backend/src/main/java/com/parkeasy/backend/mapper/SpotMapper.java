package com.parkeasy.backend.mapper;

import com.parkeasy.backend.domain.Spot;
import com.parkeasy.backend.dto.response.SpotResponse;

public class SpotMapper {

    public static SpotResponse toDto(Spot spot) {
        if (spot == null) return null;

        return SpotResponse.builder()
                .id(spot.getId())
                .spotNumber(spot.getSpotNumber())
                .floor(spot.getFloor())
                .type(spot.getType().name())
                .isAvailable(spot.getIsAvailable())
                .parkingId(spot.getParking() != null ? spot.getParking().getId() : null)
                .build();
    }
}
