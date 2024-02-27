package com.soumik.practice.springbootpractice.user;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.soumik.practice.springbootpractice.blog.BlogPost;
import com.soumik.practice.springbootpractice.blog.BlogRepo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
@RestController
public class UserResource {
	UserRepository repo;
	BlogRepo blog_repo;

	public UserResource(UserRepository repo,BlogRepo blog_repo) {
		super();
		this.repo = repo;
		this.blog_repo=blog_repo;
	}
	
	@GetMapping("/")
	public String rootPath()
	{
		return "Hello User";
	}
	@PostMapping("/users")
	public User addAUser(@RequestBody User user)
	{
		repo.save(user);
		System.out.print(user);
		return user;
	}
	@GetMapping("/users/{email}")
	public User getUser(@PathVariable String email)
	{

		User currUser=repo.findByEmail(email);
		return currUser;

	}
	@GetMapping("/users/{email}/{password}")
	public ResponseEntity<User> authenticateUser(@PathVariable String email, @PathVariable String password)
	{
		List<User> users=repo.findAll();
		for(User currUser:users)
		{
			if(currUser.getEmail().equals(email) && currUser.getPassword().equals(password))
				return ResponseEntity.ok(currUser);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@PostMapping("/users/{email}/blogs")
	public ResponseEntity<BlogPost> addBlog(@RequestBody BlogPost blog, @PathVariable String email)
	{
		User currUser=repo.findByEmail(email);
		System.out.println(currUser);
		blog.setUser(currUser);
		
		blog_repo.save(blog);
		return ResponseEntity.status(HttpStatus.OK).body(blog);
	}
	@GetMapping("/users/{email}/blogs")
	public List<BlogPost> getAllPosts(@PathVariable String email)
	{
		User currUser=repo.findByEmail(email);
		return currUser.getBlogPosts();
	}
	@GetMapping("/users/getAllPosts")
	public List<BlogPost> allPosts()
	{
		return blog_repo.findAll();
	}
}
