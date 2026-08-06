package com.parkeasy.backend.mapper;

import com.parkeasy.backend.domain.Parking;
import com.parkeasy.backend.dto.response.ParkingResponse;

public class ParkingMapper {

    public static ParkingResponse toDto(Parking parking) {
        return toDto(parking, parking != null && parking.getTotalSpots() != null ? parking.getTotalSpots() : 0);
    }

    public static ParkingResponse toDto(Parking parking, int availableSpots) {
        if (parking == null) return null;

        return ParkingResponse.builder()
                .id(parking.getId())
                .name(parking.getName())
                .address(parking.getAddress())
                .city(parking.getCity())
                .state(parking.getState())
                .latitude(parking.getLatitude())
                .longitude(parking.getLongitude())
                .totalSpots(parking.getTotalSpots())
                .availableSpots(availableSpots)
                .pricePerHour(parking.getPricePerHour())
                .openTime(parking.getOpenTime())
                .closeTime(parking.getCloseTime())
                .imageUrl(parking.getImageUrl())
                .build();
    }
}
