package com.noobg.fyp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.noobg.fyp.entity.User;
import com.noobg.fyp.entity.UserProfile;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
	public UserProfile findByUser(User user);

	@Query("SELECT u.isComplete FROM UserProfile u WHERE u.user = :#{#user.id}")
	public boolean findIsCompleteByUser(@Param("user") User user);
}
