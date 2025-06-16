package com.noobg.fyp.model;

import java.util.List;

import com.noobg.fyp.entity.Cart;

import lombok.Data;

@Data
public class CartDTO {
	private Long id;
	private List<CartItemDTO> cartItems;
	
	public CartDTO(Cart cart) {
		setId(cart.getId());
		var items = cart.getCartItems().stream().map(item -> {
			item.getProduct(); // Hot-Fix :) Loads the product dont remove
			return new CartItemDTO(item);
		}).toList();
		setCartItems(items);
	}
}