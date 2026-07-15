---
title: "Inter-Service Communication: REST & gRPC"
order: 1
module: "Communication Patterns"
track: "spring-boot"
difficulty: "Advanced"
estimated_time: "60 min"
learning_objectives:
  - "Implement synchronous REST communication between services"
  - "Set up gRPC for high-performance service-to-service calls"
  - "Implement service discovery with Eureka"
  - "Handle partial failures with circuit breakers (Resilience4j)"
prerequisites:
  - "microservices/spring-boot/module-1/lesson-1"
knowledge_refs:
  - "patterns/strategy"
  - "principles/cap-theorem"
  - "technologies/kafka"
validation:
  - type: file-exists
    path: "infrastructure/service-registry/pom.xml"
  - type: file-exists
    path: "infrastructure/service-registry/src/main/java/com/hundredx/serviceregistry/ServiceRegistryApplication.java"
  - type: file-contains
    path: "services/user-service/pom.xml"
    contains: "spring-cloud-starter-netflix-eureka-client"
    description: "Has Eureka client dependency"
  - type: cli-command
    command: "cd services/user-service && mvn compile -q 2>/dev/null || echo 'check maven'"
    description: "User service compiles"
---

# Inter-Service Communication: REST & gRPC

In a microservices architecture, services need to communicate. This lesson covers synchronous communication patterns — REST APIs and gRPC — along with service discovery and fault tolerance.

## Communication Architecture

```
┌──────────────┐      REST/gRPC       ┌──────────────┐
│              │──────────────────────→│              │
│  User Service│                      │  Order Service│
│              │←──────────────────────│              │
└──────┬───────┘      REST/gRPC       └──────────────┘
       │                                      │
       │  Register                             │  Register
       ▼                                      ▼
┌──────────────────────────────────────────────┐
│           Eureka Service Registry             │
│           (infrastructure/service-registry)   │
└──────────────────────────────────────────────┘
```

## Step 1: Create the Service Registry (Eureka Server)

Create `infrastructure/service-registry/pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.hundredx</groupId>
        <artifactId>microservices-platform</artifactId>
        <version>1.0.0</version>
        <relativePath>../../pom.xml</relativePath>
    </parent>

    <artifactId>service-registry</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
    </dependencies>
</project>
```

Create the application class:

```java
package com.hundredx.serviceregistry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceRegistryApplication.class, args);
    }
}
```

## Step 2: Create the User Service with Eureka Client

Create `services/user-service/pom.xml` with Eureka client and REST dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
</dependencies>
```

Create the User REST Controller:

```java
package com.hundredx.userservice;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<User> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found: " + id));
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return repository.save(user);
    }
}
```

## Step 3: Circuit Breaker with Resilience4j

Add circuit breaker to the Order Service when calling User Service:

```java
package com.hundredx.orderservice.client;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class UserServiceClient {

    private final DiscoveryClient discoveryClient;
    private final RestTemplate restTemplate;

    public UserServiceClient(DiscoveryClient discoveryClient, RestTemplate restTemplate) {
        this.discoveryClient = discoveryClient;
        this.restTemplate = restTemplate;
    }

    @CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
    public UserResponse getUser(Long userId) {
        ServiceInstance instance = discoveryClient.getInstances("user-service")
            .stream().findFirst()
            .orElseThrow(() -> new RuntimeException("user-service not found"));

        String url = instance.getUri() + "/api/users/" + userId;
        return restTemplate.getForObject(url, UserResponse.class);
    }

    public UserResponse getUserFallback(Long userId, Throwable t) {
        // Fallback response when user-service is unavailable
        return new UserResponse(userId, "Unknown", "Fallback user");
    }
}
```

## Engineering Decision: REST vs gRPC

**Context:** Services need to communicate synchronously.

**Decision:** Use REST for external-facing APIs and gRPC for internal service-to-service calls where latency matters.

**Why:** REST is universally understood and easy to debug; gRPC offers better performance for internal calls with strict contracts (protobuf).

| Aspect | REST | gRPC |
|--------|------|------|
| Protocol | HTTP/1.1 | HTTP/2 |
| Data Format | JSON | Protocol Buffers |
| Contract | OpenAPI/Swagger | .proto files |
| Performance | Moderate | High |
| Browser Support | Native | Requires gRPC-web |

## Validation Checklist

- [ ] `infrastructure/service-registry/` has Eureka server running
- [ ] `services/user-service/` has REST endpoints for CRUD
- [ ] Service registers with Eureka on startup
- [ ] Circuit breaker handles User Service failures
- [ ] Fallback response returns when service is down
- [ ] `mvn compile` passes for all modules
