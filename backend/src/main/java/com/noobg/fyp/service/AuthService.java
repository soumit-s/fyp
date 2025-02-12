package com.noobg.fyp.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noobg.fyp.configuration.SecurityProperties;
import com.noobg.fyp.entity.BasicAuth;
import com.noobg.fyp.entity.User;
import com.noobg.fyp.repository.BasicAuthRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.noobg.fyp.exception.EmailAlreadyTakenException;
import com.noobg.fyp.exception.UserNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class AuthService {
	@Autowired
	private UserService userService;

	@Autowired
	private BasicAuthRepository basicAuthRepository;

	@Autowired
	private SecurityProperties securityProperties;

	@Transactional(rollbackOn = { EmailAlreadyTakenException.class })
	public User signUpUserWithEmailAndPassword(String email, String password) throws EmailAlreadyTakenException {
		var user = userService.createUserWithEmail(email);
		var auth = new BasicAuth();
		auth.setUser(user);
		auth.setPassword(password);
		basicAuthRepository.save(auth);
		return user;
	}

	public Optional<String> authenticateUserWithEmailAndPassword(String email, String password) {
		var auth = basicAuthRepository.findByUserEmail(email).orElseThrow(() -> new UserNotFoundException());
		if (!password.equals(auth.getPassword())) {
			return Optional.ofNullable(null);
		}
		return Optional.ofNullable(createJwtToken(auth.getUser()));
	}

	public String authenticateUser(User user) {
		return createJwtToken(user);
	}

	private String createJwtToken(User user) {
		var claims = new HashMap<String, Object>();
		return Jwts.builder().setClaims(claims).setSubject(user.getId().toString())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 30 * 24 * 60 * 60 * 1000))
				.signWith(SignatureAlgorithm.HS256, securityProperties.getJwtSecret()).compact();
	}
}
