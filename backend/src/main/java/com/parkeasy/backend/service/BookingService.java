package com.parkeasy.backend.service;

import com.parkeasy.backend.dto.request.BookingRequest;
import com.parkeasy.backend.dto.response.BookingResponse;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(Long userId, BookingRequest request);
    List<BookingResponse> getUserBookings(Long userId);
    BookingResponse getBookingById(Long id, Long userId);
    BookingResponse cancelBooking(Long id, Long userId);
}
