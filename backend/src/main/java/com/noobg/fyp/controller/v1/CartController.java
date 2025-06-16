package com.noobg.fyp.controller.v1;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.noobg.fyp.entity.CartItem;
import com.noobg.fyp.entity.User;
import com.noobg.fyp.model.CartDTO;
import com.noobg.fyp.repository.CartItemRepository;
import com.noobg.fyp.repository.ProductRepository;
import com.noobg.fyp.service.CartService;

@Controller
@RequestMapping("/api/v1/cart")
public class CartController {
	protected final Log logger = LogFactory.getLog(getClass());

	@Autowired
	private CartService cartService;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@PostMapping("/{itemId}")
	ResponseEntity<?> addToCart(@PathVariable Long itemId, @AuthenticationPrincipal User user) {
		// Checks if user already has an existing active cart.
		var cart = cartService.getOrCreateActiveCart(user);
		var product = productRepository.getReferenceById(itemId);

		logger.info("Adding item to car " + cart);

		var cartItem = new CartItem();
		cartItem.setCart(cart);
		cartItem.setProduct(product);
		cartItem = cartItemRepository.save(cartItem);
		return ResponseEntity.ok(cartItem);
	}

	@GetMapping
	ResponseEntity<?> getCartItems(@AuthenticationPrincipal User user) {
		return ResponseEntity.ok(cartService.getActiveCartWithItems(user));
	}

	@DeleteMapping("/{cartItemId}")
	ResponseEntity<?> removeCartItem(@PathVariable Long cartItemId, @AuthenticationPrincipal User user) {
		cartService.deleteCartItem(cartItemId, user);
		return ResponseEntity.ok().build();
	}
}
