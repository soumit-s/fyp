package com.noobg.fyp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noobg.fyp.entity.BasicAuth;

@Repository
public interface BasicAuthRepository extends JpaRepository<BasicAuth, Long> {
	Optional<BasicAuth> findByUserEmail(String email);
}
