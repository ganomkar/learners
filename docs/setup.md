# Setting Up the Project

## Create a Spring Boot Application

1. **Initialize a Spring Boot Project**:
   - Use [Spring Initializr](https://start.spring.io/) to create a new Spring Boot project.
   - Select the following dependencies:
     - Spring Web
     - Spring Cache
     - H2 Database (for testing purposes)
     - Spring Data JPA

2. **Download and Extract the Project**:
   - Download the generated project and extract it to your preferred location.

## Add Dependencies

1. **Open `pom.xml`** and add the following dependencies for Cucumber:
   ```xml
   <dependency>
       <groupId>io.cucumber</groupId>
       <artifactId>cucumber-java</artifactId>
       <version>6.10.4</version>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>io.cucumber</groupId>
       <artifactId>cucumber-spring</artifactId>
       <version>6.10.4</version>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>io.cucumber</groupId>
       <artifactId>cucumber-junit</artifactId>
       <version>6.10.4</version>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-test</artifactId>
       <scope>test</scope>
   </dependency>
   ```

[Back to Table of Contents](index.md)

<script src="assets/copy-button.js"></script>
<link rel="stylesheet" type="text/css" href="assets/styles.css">
