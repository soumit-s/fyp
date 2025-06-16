package com.noobg.fyp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noobg.fyp.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
