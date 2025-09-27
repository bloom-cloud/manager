package com.bloom.manager.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/secure")
public class ApiController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello world";
    }

    @GetMapping("/test")
    public ResponseEntity<String> secureTest() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        String email = "Unknown";

        // ✅ Check all possible authentication types
        if (principal instanceof OAuth2User oauth2User) {
            // OAuth2 login (Google, Facebook)
            email = oauth2User.getAttribute("email");
        } else if (principal instanceof UserDetails userDetails) {
            // Local login (via username/password)
            email = userDetails.getUsername();
        } else if (principal instanceof String str) {
            // JWT authentication sometimes stores email as plain string
            email = str;
        }

        return ResponseEntity.ok("✅ You are logged in as: " + email);
    }
}
