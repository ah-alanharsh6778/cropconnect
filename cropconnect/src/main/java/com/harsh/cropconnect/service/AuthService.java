package com.harsh.cropconnect.service;

import com.harsh.cropconnect.dto.AuthRequest;
import com.harsh.cropconnect.dto.AuthResponse;
import com.harsh.cropconnect.dto.RegisterRequest;
import com.harsh.cropconnect.model.User;
import com.harsh.cropconnect.repository.UserRepository;
import com.harsh.cropconnect.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthService(AuthenticationManager authenticationManager,
                       CustomUserDetailsService userDetailsService,
                       JwtUtils jwtUtils,
                       PasswordEncoder passwordEncoder,
                       UserRepository userRepository) {

        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }


    public AuthResponse register(RegisterRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUserType(request.getUserType());

        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail());


        return new AuthResponse(token);
    }


    public AuthResponse login(AuthRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtUtils.generateToken(request.getEmail());

        return new AuthResponse(token);
    }
}


