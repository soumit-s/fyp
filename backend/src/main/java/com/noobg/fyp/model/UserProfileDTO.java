package com.noobg.fyp.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserProfileDTO {
	private String firstName;
	private String lastName;
	private String middleName;

	private LocalDate dateOfBirth;

	// Address details
	private String address;
	private String state;
	private String province;
	private String country;
	private Long pinCode;

	private boolean isComplete;
}
