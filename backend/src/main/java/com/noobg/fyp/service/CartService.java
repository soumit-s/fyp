package com.noobg.fyp.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.noobg.fyp.entity.Cart;
import com.noobg.fyp.entity.User;
import com.noobg.fyp.model.CartDTO;
import com.noobg.fyp.repository.CartItemRepository;
import com.noobg.fyp.repository.CartRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {
	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	public Cart getActiveCart(User user) {
		Cart cart = new Cart();
		cart.setUser(user);
		cart.setIsActive(true);
		return cartRepository.findOne(Example.of(cart, ExampleMatcher.matching().withIgnorePaths("user.basicAuth")))
				.orElse(null);
	}

	@Transactional
	public Cart getOrCreateActiveCart(User user) {
		Cart cart = new Cart();
		cart.setUser(user);
		cart.setIsActive(true);
		cart.setTotalAmount(new BigDecimal(0));
		var r = cartRepository.findOne(Example.of(cart, ExampleMatcher.matching().withIgnorePaths("user.basicAuth")))
				.orElse(null);
		if (r != null)
			return r;
		cart = cartRepository.save(cart);
		return cart;
	}

	@Transactional
	public CartDTO getActiveCartWithItems(User user) {
		Cart cart = getOrCreateActiveCart(user);
		cart.getCartItems();
		return new CartDTO(cart);
	}

	@Transactional
	public void deleteCartItem(Long cartItemId, User user) {
		// Check if the cart item belongs to the user
		var cartItem = cartItemRepository.findById(cartItemId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		if (cartItem.getCart().getUser().getId() != user.getId()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
		cartItemRepository.delete(cartItem);
	}
}
