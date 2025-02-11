package com.noobg.fyp.exception;

import lombok.Getter;

public class EmailAlreadyTakenException extends Exception {
	@Getter
	private String email;

	public EmailAlreadyTakenException(String email) {
		super("User with email '" + email + "' already exists");
	}
}
