package com.noobg.fyp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.noobg.fyp.entity.User;
import com.noobg.fyp.entity.UserRole;
import com.noobg.fyp.exception.EmailAlreadyTakenException;
import com.noobg.fyp.model.UserType;
import com.noobg.fyp.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	@Transactional(rollbackOn = { EmailAlreadyTakenException.class })
	public User createUserWithEmail(String email) throws EmailAlreadyTakenException {
		try {
			var user = new User();
			user.setEmail(email);
			userRepository.save(user);
			var userRole = new UserRole(UserType.USER);
			userRole.setUser(user);
			user.setRoles(new ArrayList<>(List.of(userRole)));
			userRepository.saveAndFlush(user);
			return user;
		} catch (DataIntegrityViolationException e) {
			throw new EmailAlreadyTakenException(email);
		}
	}
}
