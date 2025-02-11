package com.noobg.fyp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noobg.fyp.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
