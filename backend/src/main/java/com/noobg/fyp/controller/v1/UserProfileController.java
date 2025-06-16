package com.noobg.fyp.controller.v1;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noobg.fyp.entity.User;
import com.noobg.fyp.service.UserProfileService;

@RestController
@RequestMapping("/api/v1/profile")
public class UserProfileController {
	protected final Log logger = LogFactory.getLog(getClass());

	@Autowired
	private UserProfileService userProfileService;

	@GetMapping
	public ResponseEntity<?> getProfile(@AuthenticationPrincipal User user) {
		logger.info(">>>>>> " + user);
		var dto = userProfileService.getCompleteProfile(user);
		return ResponseEntity.ok(dto);
	}

	@GetMapping(path = "/{userId}")
	public ResponseEntity<?> getPublicProfile(@PathVariable Long userId) {
		return ResponseEntity.ok(userProfileService.getPublicProfile(userId));
	}

	@PostMapping
	public ResponseEntity<?> updateProfile() {
		return ResponseEntity.ok("");
	}

	@GetMapping(path = "/complete")
	public ResponseEntity<Boolean> isProfileComplete() {
		var currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return ResponseEntity.ok(userProfileService.isProfileComplete(currentUser));
	}
}
