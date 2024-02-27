//package com.soumik.practice.springbootpractice.basicAuth;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class BasicAuthentication {
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
//	{
//		//Chaining of calls
//		return http.authorizeHttpRequests(
//				auth->auth
//				.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
//				.anyRequest().authenticated()
//				)
//		
//		//We are enabling a popup for requests
//		.httpBasic(Customizer.withDefaults())
//		
//		//Making the auth Stateless
//		.sessionManagement(
//				session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//				)
//		//Making csrf disable;
//		.csrf().disable()
//		.build();
//	}
//}
