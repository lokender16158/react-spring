package com.loki.myapplication.myapps;

import com.loki.myapplication.myapps.property.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperties.class
})
public class MyappsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyappsApplication.class, args);
	}

}