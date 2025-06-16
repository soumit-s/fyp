package com.noobg.fyp.model;

import com.noobg.fyp.entity.Product;

import lombok.Data;

@Data
public class OrderItemDTO {
    private Long id;
		private Product product;
    private Integer quantity;

    // Getters and Setters
}