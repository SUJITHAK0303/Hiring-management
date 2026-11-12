
package com.example.ProHire.controller;

import com.example.ProHire.dto.UserCreateRequest;
import com.example.ProHire.dto.UserCreationResponse;
import com.example.ProHire.entity.User;
import com.example.ProHire.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create new user
    @PostMapping
    public ResponseEntity<UserCreationResponse> createUser(
            @RequestBody UserCreateRequest request) {

        UserCreationResponse response =
                userService.createUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        List<User> users = userService.getAllUsers();

        // Hide encrypted passwords from API response
        users.forEach(user -> user.setPassword(null));

        return ResponseEntity.ok(users);
    }
}
