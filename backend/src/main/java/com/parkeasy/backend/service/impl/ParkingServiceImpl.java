package com.parkeasy.backend.service.impl;

import com.parkeasy.backend.domain.Parking;
import com.parkeasy.backend.dto.response.ParkingResponse;
import com.parkeasy.backend.exception.ResourceNotFoundException;
import com.parkeasy.backend.mapper.ParkingMapper;
import com.parkeasy.backend.repository.BookingRepository;
import com.parkeasy.backend.repository.ParkingRepository;
import com.parkeasy.backend.service.ParkingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParkingServiceImpl implements ParkingService {

    private final ParkingRepository parkingRepository;
    private final BookingRepository bookingRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ParkingResponse> getAllParkings() {
        LocalDateTime now = LocalDateTime.now();
        return parkingRepository.findAll().stream()
                .map(parking -> {
                    long activeBookings = bookingRepository.countActiveBookingsForParking(parking.getId(), now);
                    int availableSpots = Math.max(0, parking.getTotalSpots() - (int) activeBookings);
                    return ParkingMapper.toDto(parking, availableSpots);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ParkingResponse getParkingById(Long id) {
        Parking parking = parkingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parking", "id", id));
                
        long activeBookings = bookingRepository.countActiveBookingsForParking(parking.getId(), LocalDateTime.now());
        int availableSpots = Math.max(0, parking.getTotalSpots() - (int) activeBookings);
        
        return ParkingMapper.toDto(parking, availableSpots);
    }
}
