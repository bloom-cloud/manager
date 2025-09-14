package com.bloom.manager.api.service;

import com.bloom.manager.api.config.JwtUtils;
import com.bloom.manager.api.dto.RegisterRequest;
import com.bloom.manager.api.model.AppUser;
import com.bloom.manager.api.model.AuthType;
import com.bloom.manager.api.repo.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;


    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return;
        }

        AppUser user = AppUser.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .provider(AuthType.LOCAL)
                .build();

        userRepository.save(user);
    }

    public String login(String email, String password) {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Bad password");
        }

        return jwtUtils.generateJwtToken(email);
    }

}
