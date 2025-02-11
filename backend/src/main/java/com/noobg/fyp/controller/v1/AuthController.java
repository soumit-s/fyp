package com.noobg.fyp.controller.v1;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noobg.fyp.exception.EmailAlreadyTakenException;
import com.noobg.fyp.model.ApiResponse;
import com.noobg.fyp.model.SignUpBasicAuthDTO;
import com.noobg.fyp.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	@Autowired
	private AuthService authService;

	@PostMapping("/new/basic")
	public ResponseEntity<ApiResponse<Map<String, Object>>> signUpWithBasicAuth(@RequestBody SignUpBasicAuthDTO body) {
		try {
			var user = authService.signUpUserWithBasicAuth(body.getEmail(), body.getPassword());
			var map = new HashMap<String, Object>();
			map.put("userId", user.getId());
			return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<Map<String, Object>>(map));
		} catch (EmailAlreadyTakenException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
		}
	}
}
