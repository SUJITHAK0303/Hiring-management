package com.example.ProHire.config;

import com.example.ProHire.entity.User;
import com.example.ProHire.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (!userRepository.existsByEmail("admin@prohire.com")) {

                User admin = new User();

                admin.setFullName("ProHire Admin");
                admin.setEmail("admin@prohire.com");
                admin.setPassword(
                    passwordEncoder.encode("Admin@123")
                );
                admin.setRole("ADMIN");
                admin.setStatus("ACTIVE");

                userRepository.save(admin);

                System.out.println("Admin account created!");
            }
        };
    }
}