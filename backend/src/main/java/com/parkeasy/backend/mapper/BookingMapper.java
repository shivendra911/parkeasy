package com.parkeasy.backend.mapper;

import com.parkeasy.backend.domain.Booking;
import com.parkeasy.backend.dto.response.BookingResponse;

public class BookingMapper {

    public static BookingResponse toDto(Booking booking) {
        if (booking == null) return null;

        return BookingResponse.builder()
                .id(booking.getId())
                .user(UserMapper.toDto(booking.getUser()))
                .spot(SpotMapper.toDto(booking.getSpot()))
                .parking(booking.getSpot() != null ? ParkingMapper.toDto(booking.getSpot().getParking()) : null)
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus().name())
                .vehicleNumber(booking.getVehicleNumber())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
