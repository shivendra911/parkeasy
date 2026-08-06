package com.parkeasy.backend.repository;

import com.parkeasy.backend.domain.Spot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpotRepository extends JpaRepository<Spot, Long> {
    List<Spot> findByParkingId(Long parkingId);
    List<Spot> findByParkingIdAndIsAvailableTrue(Long parkingId);
}
