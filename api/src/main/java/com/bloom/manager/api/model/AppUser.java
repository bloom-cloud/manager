package com.bloom.manager.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="app_users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private AuthType provider;  // LOCAL, GOOGLE, FACEBOOK, etc.
}


