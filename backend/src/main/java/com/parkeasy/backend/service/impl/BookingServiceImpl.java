package com.parkeasy.backend.service.impl;

import com.parkeasy.backend.domain.Booking;
import com.parkeasy.backend.domain.Spot;
import com.parkeasy.backend.domain.User;
import com.parkeasy.backend.dto.request.BookingRequest;
import com.parkeasy.backend.dto.response.BookingResponse;
import com.parkeasy.backend.exception.ResourceNotFoundException;
import com.parkeasy.backend.exception.SpotUnavailableException;
import com.parkeasy.backend.mapper.BookingMapper;
import com.parkeasy.backend.repository.BookingRepository;
import com.parkeasy.backend.repository.SpotRepository;
import com.parkeasy.backend.repository.UserRepository;
import com.parkeasy.backend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final SpotRepository spotRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public BookingResponse createBooking(Long userId, BookingRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Spot spot = spotRepository.findById(request.getSpotId())
                .orElseThrow(() -> new ResourceNotFoundException("Spot", "id", request.getSpotId()));

        if (!spot.getIsAvailable()) {
            throw new SpotUnavailableException("This spot is currently out of service.");
        }

        if (request.getStartTime().isAfter(request.getEndTime()) || request.getStartTime().isEqual(request.getEndTime())) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        // Check for conflicting bookings at the database level
        boolean hasConflict = bookingRepository.existsConflictingBooking(
                spot.getId(), request.getStartTime(), request.getEndTime());
        
        if (hasConflict) {
            throw new SpotUnavailableException("The spot is already booked for the selected time range.");
        }

        // Calculate price based on hours
        long hours = Duration.between(request.getStartTime(), request.getEndTime()).toHours();
        if (hours == 0) hours = 1; // minimum 1 hour charge
        
        BigDecimal totalPrice = spot.getParking().getPricePerHour().multiply(BigDecimal.valueOf(hours));

        Booking booking = Booking.builder()
                .user(user)
                .spot(spot)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .totalPrice(totalPrice)
                .vehicleNumber(request.getVehicleNumber())
                .status(Booking.BookingStatus.CONFIRMED)
                .build();

        // Optimistic locking (@Version) will throw OptimisticLockingFailureException if another 
        // thread manages to insert and modify at the exact same moment (less likely with insert, 
        // but helps if we update spot availability logic later).
        Booking savedBooking = bookingRepository.save(booking);

        return BookingMapper.toDto(savedBooking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getUserBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(BookingMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BookingResponse getBookingById(Long id, Long userId) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));

        if (!booking.getUser().getId().equals(userId)) {
            throw new org.springframework.security.access.AccessDeniedException("You don't have permission to view this booking");
        }

        return BookingMapper.toDto(booking);
    }

    @Override
    @Transactional
    public BookingResponse cancelBooking(Long id, Long userId) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));

        if (!booking.getUser().getId().equals(userId)) {
            throw new org.springframework.security.access.AccessDeniedException("You don't have permission to cancel this booking");
        }

        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new IllegalArgumentException("Booking is already cancelled");
        }
        
        if (booking.getStatus() == Booking.BookingStatus.COMPLETED) {
            throw new IllegalArgumentException("Cannot cancel a completed booking");
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        Booking updatedBooking = bookingRepository.save(booking);

        return BookingMapper.toDto(updatedBooking);
    }
}
