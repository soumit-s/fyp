package com.noobg.fyp.model;

import lombok.Data;

@Data
public class ApiResponse<T> {
	private boolean ok;
	private T data;

	public ApiResponse(T data) {
		this.ok = true;
		this.data = data;
	}
}
