package com.noobg.fyp.model;

public enum UserType {
	ADMIN,
	USER;

	public String getAuthority() {
		return "ROLE_" + this.name();
	}
}
