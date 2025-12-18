package com.harsh.cropconnect.controller;

import com.harsh.cropconnect.dto.Productdto;
import com.harsh.cropconnect.model.Product;
import com.harsh.cropconnect.model.User;
import com.harsh.cropconnect.repository.ProductRepository;
import com.harsh.cropconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/{farmerId}")
    public Product addProduct(@PathVariable Long farmerId, @RequestBody Productdto dto) {
        User farmer = userRepo.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImageUrl(dto.getImageUrl());
        product.setFarmer(farmer);

        return productRepo.save(product);
    }

    @GetMapping("/farmer/{farmerId}")
    public List<Product> getProductsByFarmer(@PathVariable Long farmerId) {
        User farmer = userRepo.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        return productRepo.findByFarmer(farmer);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @PutMapping("/{productId}")
    public Product updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setStock(updatedProduct.getStock());

        return productRepo.save(product);
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable Long productId) {
        if (!productRepo.existsById(productId)) {
            throw new RuntimeException("Product not found");
        }
        productRepo.deleteById(productId);
        return "Product deleted successfully";
    }


}

