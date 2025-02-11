package com.noobg.fyp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noobg.fyp.entity.BasicAuth;
import com.noobg.fyp.entity.User;
import com.noobg.fyp.repository.BasicAuthRepository;
import com.noobg.fyp.exception.EmailAlreadyTakenException;

import jakarta.transaction.Transactional;

@Service
public class AuthService {
	@Autowired
	private UserService userService;
	
	@Autowired
	private BasicAuthRepository basicAuthRepository;

	@Transactional(rollbackOn = {EmailAlreadyTakenException.class})
	public User signUpUserWithBasicAuth(String email, String password) throws EmailAlreadyTakenException {
		var user = userService.createUserWithEmail(email);
		var auth = new BasicAuth();
		auth.setUser(user);
		auth.setPassword(password);
		basicAuthRepository.save(auth);
		return user;
	}
}
