package com.noobg.fyp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.noobg.fyp.entity.Product;
import com.noobg.fyp.entity.User;
import com.noobg.fyp.entity.Wishlist;
import com.noobg.fyp.repository.WishlistRepository;

@Service
public class WishlistService {
	@Autowired
	private WishlistRepository wishlistRepository;

	public boolean isWishlisted(Product product, User user) {
		var wishlist = new Wishlist();
		wishlist.setUser(user);
		wishlist.setProduct(product);
		return wishlistRepository.exists(Example.of(wishlist, ExampleMatcher.matching().withIgnorePaths("user.basicAuth")));
	}

	public boolean deleteWishlisted(Product product, User user) {
		var wishlist = new Wishlist();
		wishlist.setUser(user);
		wishlist.setProduct(product);

		wishlist = wishlistRepository.findOne(Example.of(wishlist, ExampleMatcher.matching().withIgnorePaths("user.basicAuth"))).orElse(null);
		if (wishlist == null) {
			return false;
		}
		wishlistRepository.delete(wishlist);
		return true;
	}
}
