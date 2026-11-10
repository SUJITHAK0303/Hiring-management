package com.example.ProHire.auth;

import com.example.ProHire.dto.AuthResponse;
import com.example.ProHire.dto.LoginRequest;
import com.example.ProHire.dto.RegisterRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:5173"
})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // LOGIN API
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    // FIRST MANAGER SETUP API
    @PostMapping("/setup-manager")
    public ResponseEntity<AuthResponse> setupManager(
            @RequestBody RegisterRequest request) {

        AuthResponse response =
                authService.createFirstManager(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}