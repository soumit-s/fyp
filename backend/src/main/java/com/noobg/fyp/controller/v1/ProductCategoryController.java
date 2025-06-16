package com.noobg.fyp.controller.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.noobg.fyp.repository.ProductCategoryRepository;

@Controller
@RequestMapping("/api/v1/category")
public class ProductCategoryController {

	@Autowired
	private ProductCategoryRepository productCategoryRepository;

	// Returns the list of all categories
	@GetMapping
	ResponseEntity<?> getCategories() {
		var categories = productCategoryRepository.findAll();
		return ResponseEntity.ok().body(categories);
	}
}
