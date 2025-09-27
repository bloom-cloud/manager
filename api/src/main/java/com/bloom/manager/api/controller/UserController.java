package com.bloom.manager.api.controller;

import com.bloom.manager.api.model.AppUser;
import com.bloom.manager.api.repo.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AppUserRepository repository;
    private final PasswordEncoder encoder;

    record ChangePasswordRequest(String oldPassword, String newPassword) {}

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(Authentication auth, @RequestBody ChangePasswordRequest request) {
        String email = auth.getName();
        AppUser user = repository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            if (!encoder.matches(request.oldPassword, request.newPassword)) {
                return ResponseEntity.badRequest().body("Old password is not correct");
            }
        }

        user.setPassword(encoder.encode(request.newPassword));
        repository.save(user);

        return ResponseEntity.ok("Password changed.");
    }

}

