package com.soumik.practice.springbootpractice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SpringbootpracticeApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootpracticeApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer corsConfigure() {
		//We will override this method so that we can allow CoRS.
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedMethods("*").allowedOrigins("http://localhost:3000");
			}
		};
	}

}
