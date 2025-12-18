package com.harsh.cropconnect.controller;

import com.harsh.cropconnect.model.User;
import com.harsh.cropconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepo.save(user);
    }

    @GetMapping
    public List<User> getAll() {
        return userRepo.findAll();
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable Long userId) {
        if (!userRepo.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepo.deleteById(userId);
        return "User deleted successfully";
    }
}
