
package com.example.ProHire.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class UserCreateRequest {

    private String employeeId;

    private String fullName;

    private String email;

    private String phoneNumber;

    private String role;

    private String status;

    private Long teamId;
}
