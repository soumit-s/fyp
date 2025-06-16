package com.noobg.fyp.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "fyp_user_profile")
@Data
public class UserProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;

	@OneToOne
	@JoinColumn(nullable = false)
	private User user;

	@Column(name = "avatar_url", columnDefinition = "TEXT")
	private String avatarUrl;

	private String firstName;
	private String middleName;
	private String lastName;

	private LocalDate dateOfBirth;

	private String address;
	private String state;
	private String province;
	private String country;
	private Long pinCode;

	@Column(columnDefinition = "boolean default false", nullable = false)
	private boolean isComplete;
}
