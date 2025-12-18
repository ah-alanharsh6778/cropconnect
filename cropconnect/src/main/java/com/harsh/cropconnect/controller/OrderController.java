package com.harsh.cropconnect.controller;

import com.harsh.cropconnect.model.*;
import com.harsh.cropconnect.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ProductRepository productRepo;

    @PostMapping("/buyer/{buyerId}")
    public Order placeOrder(@PathVariable Long buyerId, @RequestBody List<Long> productIds) {
        User buyer = userRepo.findById(buyerId)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
        List<Product> products = productRepo.findAllById(productIds);
        double total = products.stream().mapToDouble(Product::getPrice).sum();

        Order order = new Order();
        order.setBuyer(buyer);
        order.setProducts(products);
        order.setTotalAmount(total);
        return orderRepo.save(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @DeleteMapping("/{orderId}")
    public String deleteOrder(@PathVariable Long orderId) {
        if (!orderRepo.existsById(orderId)) {
            throw new RuntimeException("Order not found");
        }
        orderRepo.deleteById(orderId);
        return "Order deleted successfully";
    }

}
