package com.harsh.cropconnect.repository;
import com.harsh.cropconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.harsh.cropconnect.model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByFarmer(User farmer);

}
