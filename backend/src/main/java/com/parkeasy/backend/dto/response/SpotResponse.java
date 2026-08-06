package com.parkeasy.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SpotResponse {
    private Long id;
    private String spotNumber;
    private Integer floor;
    private String type;
    private Boolean isAvailable;
    private Long parkingId;
}
