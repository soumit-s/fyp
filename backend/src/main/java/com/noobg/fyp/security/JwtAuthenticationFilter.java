package com.noobg.fyp.security;

import java.io.IOException;
import java.util.Arrays;

import com.noobg.fyp.entity.User;
import com.noobg.fyp.service.AuthService;
import com.noobg.fyp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthService authService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader("Authorization");
		if (header == null || !header.startsWith("Bearer ")) {
			logger.info("User not authenticated");
			logger.info(header);
			filterChain.doFilter(request, response);
			return;
		}

		try {
			// Extract JWT token from header
			String token = header.substring(7); // Remove "Bearer " prefix
			logger.info("Validating token " + token);
			User user = authService.validateTokenAndGetUser(token);

			// Validate token and extract username
			if (user != null) {
				logger.info("Authenticating " + user.getId() + " " + user.getEmail());
				// Create authentication token
				UsernamePasswordAuthenticationToken authToken =
						new UsernamePasswordAuthenticationToken(
								user,
								null,
								user.getRoles().stream().map(
										role -> new SimpleGrantedAuthority(role.getRole().getAuthority())).toList()
						);

				// Set additional details
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				// Set authentication in security context
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		} catch (Exception e) {
			logger.error("Cannot set user authentication: {}", e);
		}

		filterChain.doFilter(request, response);
	}
}
