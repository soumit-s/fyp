package com.noobg.fyp.model;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;

import com.noobg.fyp.entity.Order;

import lombok.Data;

@Data
public class OrderDTO {
	private Long id;
	private Long userId;
	private List<OrderItemDTO> orderItems;
	private String status;
	private String deliveryAddress;
	private String returnAddress;
	private LocalDateTime returnDate;
	private BigInteger rentDuration;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	public OrderDTO(Order order) {
		this.setId(order.getId());
		this.setUserId(order.getUser().getId());
		this.setStatus(order.getStatus());
		this.setDeliveryAddress(order.getDeliveryAddress());
		this.setReturnAddress(order.getReturnAddress());
		this.setReturnDate(order.getReturnDate());
		this.setRentDuration(order.getRentDuration());
		this.setCreatedAt(order.getCreatedAt());
		this.setUpdatedAt(order.getUpdatedAt());

		List<OrderItemDTO> itemDTOs = order.getOrderItems().stream().map(item -> {
			OrderItemDTO itemDTO = new OrderItemDTO();
			itemDTO.setId(item.getId());
			itemDTO.setProduct(item.getProduct());
			itemDTO.setQuantity(item.getQuantity());
			return itemDTO;
		}).toList();

		this.setOrderItems(itemDTOs);
	}
}