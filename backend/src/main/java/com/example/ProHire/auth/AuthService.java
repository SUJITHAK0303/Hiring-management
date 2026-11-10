package com.example.ProHire.auth;

import com.example.ProHire.dto.AuthResponse;
import com.example.ProHire.dto.LoginRequest;
import com.example.ProHire.dto.RegisterRequest;
import com.example.ProHire.entity.User;
import com.example.ProHire.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!"ACTIVE".equals(user.getStatus())) {
            throw new RuntimeException("Your account is inactive");
        }

        if (!"MANAGER".equals(user.getRole())) {
    throw new RuntimeException("Access denied. Manager account only.");
}

        return new AuthResponse(
                "Login successful",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );
    }

    public AuthResponse createFirstManager(RegisterRequest request) {

        if (userRepository.count() > 0) {
            throw new RuntimeException(
                    "Initial Manager setup is already completed");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User manager = new User();
        manager.setFullName(request.getFullName());
        manager.setEmail(request.getEmail());
        manager.setPassword(
                passwordEncoder.encode(request.getPassword()));
        manager.setRole("MANAGER");
        manager.setStatus("ACTIVE");

        User savedManager = userRepository.save(manager);

        return new AuthResponse(
                "Manager account created successfully",
                savedManager.getId(),
                savedManager.getFullName(),
                savedManager.getEmail(),
                savedManager.getRole()
        );
    }
}