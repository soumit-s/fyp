package com.noobg.fyp.entity;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "fyp_product_categories")
public class ProductCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", nullable = false, columnDefinition = "TEXT")
	@ColumnDefault("''")
	private String description;

	@Column(name = "image_url", nullable = true, columnDefinition = "TEXT")
	private String imageUrl;

	@Column(name = "is_active", nullable = false)
	@ColumnDefault("TRUE")
	private Boolean isActive;

	@ManyToOne
	@JoinColumn(name = "parent_id", nullable = true)
	private ProductCategory parentCategory;
}