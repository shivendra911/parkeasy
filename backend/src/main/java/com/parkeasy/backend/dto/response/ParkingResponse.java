package com.parkeasy.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ParkingResponse {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String state;
    private Double latitude;
    private Double longitude;
    private Integer totalSpots;
    private Integer availableSpots;
    private BigDecimal pricePerHour;
    private LocalTime openTime;
    private LocalTime closeTime;
    private String imageUrl;
}
