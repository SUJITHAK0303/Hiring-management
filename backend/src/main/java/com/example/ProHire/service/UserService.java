
package com.example.ProHire.service;

import com.example.ProHire.entity.User;
import com.example.ProHire.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(
            String fullName,
            String email,
            String password,
            String role) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();

        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setStatus("ACTIVE");

        return userRepository.save(user);
    }
}
