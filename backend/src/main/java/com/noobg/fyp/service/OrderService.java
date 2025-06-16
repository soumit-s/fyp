package com.noobg.fyp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.noobg.fyp.entity.Cart;
import com.noobg.fyp.entity.Order;
import com.noobg.fyp.entity.OrderItem;
import com.noobg.fyp.entity.User;
import com.noobg.fyp.model.OrderDTO;
import com.noobg.fyp.repository.CartRepository;
import com.noobg.fyp.repository.OrderItemRepository;
import com.noobg.fyp.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartService cartService;

	@Transactional
	public Order createOrderFromCart(User user) {
		var cart = cartService.getActiveCart(user);
		if (cart.getCartItems().isEmpty()) {
			return null;
		}
		
		var order = new Order();
		order.setUser(user);
		order.setStatus("draft");

		List<OrderItem> orderItems = new ArrayList<>();
		for (var cartItem: cart.getCartItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setOrder(order);
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuantity());
			orderItems.add(orderItem);
		}
		
		order.setOrderItems(orderItems);
		order = orderRepository.save(order);
		return order;
	}

	@Transactional
	public Optional<OrderDTO> getOrderDetails(User user, Long orderId) {
		return orderRepository.findById(orderId).filter(o -> o.getUser().getId().equals(user.getId())).map(order -> {
			order.getOrderItems();
			return new OrderDTO(order);
		});
	}
}