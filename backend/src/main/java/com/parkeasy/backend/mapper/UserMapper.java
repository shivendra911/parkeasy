package com.parkeasy.backend.mapper;

import com.parkeasy.backend.domain.Role;
import com.parkeasy.backend.domain.User;
import com.parkeasy.backend.dto.response.UserResponse;

import java.util.stream.Collectors;

public class UserMapper {

    public static UserResponse toDto(User user) {
        if (user == null) return null;

        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .roles(user.getRoles().stream().map(Role::getName).map(Enum::name).collect(Collectors.toList()))
                .build();
    }
}
