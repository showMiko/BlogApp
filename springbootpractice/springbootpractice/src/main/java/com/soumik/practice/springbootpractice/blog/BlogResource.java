package com.soumik.practice.springbootpractice.blog;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BlogResource {
	BlogRepo repo;

	public BlogResource(BlogRepo repo) {
		super();
		this.repo = repo;
	}
	
//	@PostMapping("/blogs")
//	public BlogPost addBlog(@RequestBody BlogPost blog)
//	{
//		repo.save(blog);
//		return blog;
//	}
	@GetMapping("/blogs")
	public List<BlogPost> getAllPosts()
	{
		List<BlogPost> posts= repo.findAll();
		return posts;
	}
}
