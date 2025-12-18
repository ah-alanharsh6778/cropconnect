package com.harsh.cropconnect.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.harsh.cropconnect.model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyer_Id(Long buyerId);

}

