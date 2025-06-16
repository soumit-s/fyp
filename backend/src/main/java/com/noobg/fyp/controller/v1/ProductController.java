package com.noobg.fyp.controller.v1;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.noobg.fyp.entity.Product;
import com.noobg.fyp.entity.User;
import com.noobg.fyp.model.CreateProductDTO;
import com.noobg.fyp.repository.ProductRepository;
import com.noobg.fyp.service.WishlistService;

@RestController
@RequestMapping("/api/v1/product")
public class ProductController {
	@Autowired
	private WishlistService wishlistService;

	@Autowired
	private ProductRepository productRepository;

	@PostMapping
	public ResponseEntity<?> createProduct(@RequestBody CreateProductDTO body) {
		var product = new Product();
		product.setName(body.getName());
		product.setDescription(body.getDescription());
		product = productRepository.save(product);

		Map<String, Object> resBody = new HashMap<String, Object>();
		resBody.put("id", product.getId());

		return ResponseEntity.ok(resBody);
	}

	@GetMapping("{productId}")
	public ResponseEntity<?> getProduct(@PathVariable Long productId, @AuthenticationPrincipal User user) {
		var product = productRepository.findById(productId);
		if (product.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		if (user == null) {
			return ResponseEntity.ok(product);
		}
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new JavaTimeModule());
		
		ObjectNode jsonNode = mapper.valueToTree(product.get());
		jsonNode.put("isWishlisted", wishlistService.isWishlisted(product.get(), user));
		return ResponseEntity.ok(jsonNode);
	}
}
