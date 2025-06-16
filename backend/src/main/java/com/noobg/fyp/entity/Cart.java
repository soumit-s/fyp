package com.noobg.fyp.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "fyp_carts")
@Data
@ToString(exclude = "user")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "is_active", nullable = false)
	@ColumnDefault("TRUE")
	private Boolean isActive;

	@Column(name = "rental_start_date", nullable = true)
	private LocalDate rentalStartDate;

	@Column(name = "rental_end_date", nullable = true)
	private LocalDate rentalEndDate;

	@Column(name = "rental_days", nullable = true)
	private Integer rentalDays;

	@Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
	@ColumnDefault("0")
	private BigDecimal totalAmount;

	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<CartItem> cartItems;

	@CreationTimestamp
	@Column(updatable = false, nullable = false)
	private LocalDateTime createdAt;
}