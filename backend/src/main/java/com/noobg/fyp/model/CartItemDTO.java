package com.noobg.fyp.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.noobg.fyp.entity.CartItem;
import com.noobg.fyp.entity.Product;

import lombok.Data;

@Data
public class CartItemDTO {
	private Long id;
	private Product product;
	private BigDecimal dailyPrice;
	private BigDecimal securityDeposit;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Integer quantity;

	public CartItemDTO(CartItem item) {
		setId(item.getId());
		setQuantity(item.getQuantity());
		setProduct(item.getProduct());
		setDailyPrice(item.getDailyPrice());
		setSecurityDeposit(item.getSecurityDeposit());
		setCreatedAt(item.getCreatedAt());
		setUpdatedAt(item.getUpdatedAt());
	}

}
