
package com.example.ProHire.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserCreationResponse {

    private Long userId;
    private String employeeId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String role;
    private String status;
    private String teamName;
    private String temporaryPassword;
}
