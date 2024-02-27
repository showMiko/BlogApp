package com.soumik.practice.springbootpractice.blog;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.soumik.practice.springbootpractice.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class BlogPost {
	@GeneratedValue
	@Id
	private Integer id;
	private String title;
	private String category;
	@Column(length = 65555)
	private String description;
	private String imageUrl;
	
	public String getimageUrl() {
		return imageUrl;
	}
	public void setimageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private User user;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "BlogPost [id=" + id + ", title=" + title + ", Category=" + category + ", description=" + description
				+ ", imageUrl=" + imageUrl + ", user=" + user + "]";
	}

	public BlogPost() {
		super();
	}
	public BlogPost(Integer id, String title, String category, String description, String imageUrl, User user) {
		super();
		this.id = id;
		this.title = title;
		this.category = category;
		this.description = description;
		this.imageUrl = imageUrl;
		this.user = user;
	}
}
