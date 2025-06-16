package com.noobg.fyp.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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

@Entity
@Table(name = "fyp_products")
@Data
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private ProductCategory category;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "is_active", nullable = false)
	@ColumnDefault("TRUE")
	private Boolean isActive;

	@Column(name = "remaining_stock", nullable = false)
	@ColumnDefault("0")
	private Integer remainingStock;

	@Column(name = "daily_price", nullable = false, precision = 10, scale = 2)
	@ColumnDefault("100")
	private BigDecimal dailyPrice;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ProductImage> productImages;

	@Column(name = "rating_average", nullable = false, precision = 3, scale = 2)
	@ColumnDefault("0")
	private BigDecimal ratingAverage;

	@Column(name = "rating_count", nullable = false)
	@ColumnDefault("0")
	private Integer ratingCount;

	@CreationTimestamp
	@Column(name = "created_at", updatable = false, nullable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;
}
