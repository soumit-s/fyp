package com.noobg.fyp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.noobg.fyp.model.UserType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "fyp_user_roles", uniqueConstraints = {
	@UniqueConstraint(columnNames = { "user", "role" })
})
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@ToString(exclude = "user")
public class UserRole {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false)
	@JsonBackReference
	private User user;

	@Column(nullable = false)
	@NonNull
	private UserType role;
}
