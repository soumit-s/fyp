package com.noobg.fyp.controller.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.noobg.fyp.entity.User;
import com.noobg.fyp.entity.Wishlist;
import com.noobg.fyp.repository.ProductRepository;
import com.noobg.fyp.repository.WishlistRepository;
import com.noobg.fyp.service.WishlistService;

@Controller
@RequestMapping("/api/v1/wishlist")
public class WishlistController {

	@Autowired
	private WishlistRepository wishlistRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private WishlistService wishlistService;

	@PostMapping("{productId}")
	ResponseEntity<?> wishlistProduct(@PathVariable Long productId, @AuthenticationPrincipal User user) {
		var product = productRepository.getReferenceById(productId);
		var wishlist = new Wishlist();
		wishlist.setUser(user);
		wishlist.setProduct(product);
		wishlistRepository.save(wishlist);
		return ResponseEntity.ok().body(true);
	}

	@GetMapping("{productId}")
	ResponseEntity<?> isWishlisted(@PathVariable Long productId, @AuthenticationPrincipal User user) {
		var product = productRepository.getReferenceById(productId);
		return ResponseEntity.ok().body(wishlistService.isWishlisted(product, user));
	}

	@GetMapping
	ResponseEntity<?> getWishlists(@AuthenticationPrincipal User user) {
		var wishlist = new Wishlist();
		wishlist.setUser(user);
		var wishlists = wishlistRepository
				.findAll(Example.of(wishlist, ExampleMatcher.matching().withIgnorePaths("user.basicAuth")));
		return ResponseEntity.ok().body(wishlists);
	}

	@DeleteMapping("{productId}")
	ResponseEntity<?> deleteWishlist(@PathVariable Long productId, @AuthenticationPrincipal User user) {
		var product = productRepository.getReferenceById(productId);
		return ResponseEntity.ok(wishlistService.deleteWishlisted(product, user));
	}
}
