
package com.example.ProHire.service;

import com.example.ProHire.dto.UserCreateRequest;
import com.example.ProHire.dto.UserCreationResponse;
import com.example.ProHire.entity.Team;
import com.example.ProHire.entity.User;
import com.example.ProHire.repository.TeamRepository;
import com.example.ProHire.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            TeamRepository teamRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Generate temporary password
    private String generateTemporaryPassword() {

        String characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#";

        SecureRandom random = new SecureRandom();

        StringBuilder password = new StringBuilder();

        for (int i = 0; i < 12; i++) {
            int index = random.nextInt(characters.length());
            password.append(characters.charAt(index));
        }

        return password.toString();
    }

    // Create new user
    public UserCreationResponse createUser(UserCreateRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        if (userRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new RuntimeException("Employee ID already exists!");
        }

        if (request.getTeamId() == null) {
            throw new RuntimeException("Please select a team!");
        }

        Team team = teamRepository.findById(request.getTeamId())
                .orElseThrow(() ->
                        new RuntimeException("Selected team not found!"));

        if (!"ACTIVE".equalsIgnoreCase(team.getStatus())) {
            throw new RuntimeException("Selected team is inactive!");
        }

        String temporaryPassword = generateTemporaryPassword();

        User user = new User();

        user.setEmployeeId(request.getEmployeeId());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());

        user.setPassword(
                passwordEncoder.encode(temporaryPassword)
        );

        user.setRole(request.getRole());

        String status = request.getStatus();

        if (status == null || status.isBlank()) {
            status = "ACTIVE";
        }

        user.setStatus(status);
        user.setTeam(team);

        User savedUser = userRepository.save(user);

        return new UserCreationResponse(
                savedUser.getId(),
                savedUser.getEmployeeId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getPhoneNumber(),
                savedUser.getRole(),
                savedUser.getStatus(),
                savedUser.getTeam().getTeamName(),
                temporaryPassword
        );
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
