package com.noobg.fyp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noobg.fyp.entity.User;
import com.noobg.fyp.exception.UserNotFoundException;
import com.noobg.fyp.model.PublicProfileDTO;
import com.noobg.fyp.model.UserProfileDTO;
import com.noobg.fyp.repository.UserProfileRepository;
import com.noobg.fyp.repository.UserRepository;

@Service
public class UserProfileService {
	@Autowired
	private UserProfileRepository userProfileRepository;

	@Autowired
	private UserRepository userRepository;

	public PublicProfileDTO getPublicProfile(User user) {
		var userProfile = userProfileRepository.findByUser(user);
		if (userProfile == null) {
			throw new UserNotFoundException();
		}
		var p = new PublicProfileDTO();
		p.setId(user.getId());
		p.setName((userProfile.getFirstName() + " " + userProfile.getLastName()).trim());
		return p;
	}

	public PublicProfileDTO getPublicProfile(Long userId) {
		var user = userRepository.getReferenceById(userId);
		return getPublicProfile(user);
	}

	public UserProfileDTO getCompleteProfile(User user) {
		var profile = userProfileRepository.findByUser(user);
		var dto = new UserProfileDTO();
		dto.setFirstName(profile.getFirstName());
		dto.setLastName(profile.getLastName());
		dto.setMiddleName(profile.getMiddleName());
		dto.setDateOfBirth(profile.getDateOfBirth());
		dto.setCountry(profile.getCountry());
		dto.setProvince(profile.getProvince());
		dto.setState(profile.getState());
		dto.setAddress(profile.getAddress());
		dto.setPinCode(profile.getPinCode());
		dto.setComplete(profile.isComplete());
		return dto;
	}

	public boolean isProfileComplete(User user) {
		return userProfileRepository.findIsCompleteByUser(user);
	}
}
