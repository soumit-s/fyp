package com.noobg.fyp.controller.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.noobg.fyp.entity.User;
import com.noobg.fyp.repository.OrderRepository;
import com.noobg.fyp.service.OrderService;

@Controller
@RequestMapping("/api/v1/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private OrderRepository orderRepository;

	@PostMapping("/cart/create")
	public ResponseEntity<?> createOrderFromCart(@AuthenticationPrincipal User user) {
		var order = orderService.createOrderFromCart(user);
		return ResponseEntity.ok(order);
	}

	@GetMapping("/{orderId}")
	public ResponseEntity<?> getOrderDetails(@AuthenticationPrincipal User user, @PathVariable Long orderId) {
		return orderService.getOrderDetails(user, orderId).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
}
