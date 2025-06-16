package com.noobg.fyp.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

import com.noobg.fyp.repository.UserRepository;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.noobg.fyp.configuration.SecurityProperties;
import com.noobg.fyp.entity.BasicAuth;
import com.noobg.fyp.entity.User;
import com.noobg.fyp.entity.UserProfile;
import com.noobg.fyp.repository.BasicAuthRepository;
import com.noobg.fyp.repository.UserProfileRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.noobg.fyp.exception.EmailAlreadyTakenException;
import com.noobg.fyp.exception.UserNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class AuthService {
	protected final Log logger = LogFactory.getLog(getClass());

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserProfileRepository userProfileRepository;

	@Autowired
	private BasicAuthRepository basicAuthRepository;

	@Autowired
	private SecurityProperties securityProperties;

	@Transactional(rollbackOn = { EmailAlreadyTakenException.class })
	public User signUpUserWithEmailAndPassword(String email, String password) throws EmailAlreadyTakenException {
		String hashedPassword = hashPassword(password);
		var user = userService.createUserWithEmail(email);
		var auth = new BasicAuth();
		auth.setUser(user);
		auth.setPassword(hashedPassword);
		basicAuthRepository.save(auth);
		var profile = new UserProfile();
		profile.setUser(user);
		userProfileRepository.save(profile);
		return user;
	}

	public Optional<String> authenticateUserWithEmailAndPassword(String email, String password) {
		var auth = basicAuthRepository.findByUserEmail(email).orElseThrow(() -> new UserNotFoundException());
		if (!BCrypt.checkpw(password, auth.getPassword())) {
			return Optional.empty();
		}
		return Optional.ofNullable(createJwtToken(auth.getUser()));
	}

	public String authenticateUser(User user) {
		return createJwtToken(user);
	}

	private String createJwtToken(User user) {
		var claims = new HashMap<String, Object>();
		LocalDate localDate = LocalDate.now().plusDays(30);
		Date newDate = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		return Jwts.builder().setClaims(claims).setSubject(user.getId().toString())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(newDate)
				.signWith(SignatureAlgorithm.HS256, securityProperties.getJwtSecret()).compact();
	}

	public String hashPassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt());
	}

	@Transactional
	public User validateTokenAndGetUser(String token) {
		try {
			var body = Jwts.parser().setSigningKey(securityProperties.getJwtSecret()).parseClaimsJws(token).getBody();
			// logger.info(body.getSubject() + " " + body.getId());
			Long userId = Long.parseLong(body.getSubject());
			logger.info("User Id " + userId);
			return userRepository.findById(userId).orElse(null);
		} catch (Exception e) {
			logger.error("Error during validating token " + e.getMessage());
			return null;
		}
	}

}
