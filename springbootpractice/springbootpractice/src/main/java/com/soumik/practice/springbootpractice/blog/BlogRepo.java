package com.soumik.practice.springbootpractice.blog;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepo extends JpaRepository<BlogPost, Integer> {
	
}
