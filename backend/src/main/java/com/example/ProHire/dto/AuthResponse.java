
package com.example.ProHire.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {

    private String message;
    private Long userId;
    private String fullName;
    private String email;
    private String role;
}
