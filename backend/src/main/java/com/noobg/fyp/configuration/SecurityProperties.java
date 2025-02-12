package com.noobg.fyp.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "security")
@Data
public class SecurityProperties {
	private String jwtSecret;
}
