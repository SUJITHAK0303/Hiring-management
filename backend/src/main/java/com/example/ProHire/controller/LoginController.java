
package com.example.ProHire.controller;

import com.example.ProHire.entity.User;
import com.example.ProHire.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!"ACTIVE".equals(user.getStatus())) {
            throw new RuntimeException("Your account is inactive");
        }

        return Map.of(
                "message", "Login successful",
                "name", user.getFullName(),
                "email", user.getEmail(),
                "role", user.getRole()
        );
    }
}
