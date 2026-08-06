package com.parkeasy.backend.service.impl;

import com.parkeasy.backend.domain.Spot;
import com.parkeasy.backend.dto.response.SpotResponse;
import com.parkeasy.backend.exception.ResourceNotFoundException;
import com.parkeasy.backend.mapper.SpotMapper;
import com.parkeasy.backend.repository.BookingRepository;
import com.parkeasy.backend.repository.SpotRepository;
import com.parkeasy.backend.service.SpotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpotServiceImpl implements SpotService {

    private final SpotRepository spotRepository;
    private final BookingRepository bookingRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SpotResponse> getSpotsByParking(Long parkingId) {
        LocalDateTime now = LocalDateTime.now();
        return spotRepository.findByParkingId(parkingId).stream()
                .map(spot -> {
                    SpotResponse dto = SpotMapper.toDto(spot);
                    // Check if there are any active or future confirmed bookings for this spot
                    boolean hasBooking = bookingRepository.existsConflictingBooking(spot.getId(), now, now.plusYears(100));
                    if (hasBooking) {
                        dto.setIsAvailable(false);
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SpotResponse getSpotById(Long id) {
        Spot spot = spotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Spot", "id", id));
        return SpotMapper.toDto(spot);
    }
}
