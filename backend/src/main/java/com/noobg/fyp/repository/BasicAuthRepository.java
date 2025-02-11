package com.noobg.fyp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noobg.fyp.entity.BasicAuth;

@Repository
public interface BasicAuthRepository extends JpaRepository<BasicAuth, Long> {}
