package com.noobg.fyp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noobg.fyp.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	
}
