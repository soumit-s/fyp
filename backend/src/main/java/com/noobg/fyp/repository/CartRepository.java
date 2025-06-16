package com.noobg.fyp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noobg.fyp.entity.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	
}
