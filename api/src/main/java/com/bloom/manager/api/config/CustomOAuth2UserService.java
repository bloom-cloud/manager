package com.bloom.manager.api.config;

import com.bloom.manager.api.model.AppUser;
import com.bloom.manager.api.model.AuthType;
import com.bloom.manager.api.repo.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AppUserRepository repository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String email = oAuth2User.getAttribute("email");
        repository.findByEmail(email).orElseGet(() -> {
            AppUser user = AppUser.builder()
                    .email(email)
                    .password("")
                    .provider(AuthType.GOOGLE)
                    .build();
            return repository.save(user);
        });
        return  oAuth2User;
    }
}
