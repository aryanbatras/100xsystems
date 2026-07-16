---
title: "Circuit Breakers & Resilience Patterns"
order: 1
module: "Production Patterns"
track: "spring-boot"
difficulty: "Advanced"
estimated_time: "60 min"
learning_objectives:
  - "Implement circuit breakers with Resilience4j"
  - "Build retry and fallback mechanisms"
  - "Design bulkhead isolation for services"
prerequisites:
  - "microservices/spring-boot/module-3/lesson-1"
knowledge_refs:
  - "patterns/circuit-breaker"
  - "patterns/bulkhead"
  - "principles/cap-theorem"
validation:
  - type: file-exists
    path: "src/main/java/com/example/userservice/config/ResilienceConfig.java"
  - type: file-contains
    path: "src/main/java/com/example/userservice/config/ResilienceConfig.java"
    contains: "CircuitBreaker"
    description: "Has CircuitBreaker configuration"
  - type: file-exists
    path: "docker-compose.yml"
  - type: npm-test
    script: "build"
---

# Circuit Breakers & Resilience Patterns

In a distributed system, failures are inevitable. Services crash, networks timeout, databases go down. The key to building resilient microservices is not preventing failures — it's handling them gracefully.

## The Problem

```
Service A ──HTTP──> Service B ──HTTP──> Service C
                       │
                       ▼
                   [TIMEOUT!]
                       │
                       ▼
              Cascading failures:
              A's threads are blocked waiting for B
              B's threads are blocked waiting for C
              → Service crashes from thread pool exhaustion
```

## Step 1: Add Resilience4j Dependencies

Add to `pom.xml`:

```xml
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-spring-boot3</artifactId>
    <version>2.2.0</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

## Step 2: Circuit Breaker Configuration

Create `src/main/java/com/example/userservice/config/ResilienceConfig.java`:

```java
package com.example.userservice.config;

import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.timelimiter.TimeLimiterConfig;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JCircuitBreakerFactory;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JConfigBuilder;
import org.springframework.cloud.client.circuitbreaker.Customizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class ResilienceConfig {

    @Bean
    public Customizer<Resilience4JCircuitBreakerFactory> defaultCircuitBreaker() {
        return factory -> factory.configureDefault(id -> new Resilience4JConfigBuilder(id)
            .circuitBreakerConfig(CircuitBreakerConfig.custom()
                .slidingWindowSize(10)           // Count last 10 calls
                .failureRateThreshold(50)        // Open at 50% failure rate
                .waitDurationInOpenState(Duration.ofSeconds(30))  // Wait 30s before half-open
                .permittedNumberOfCallsInHalfOpenState(3)         // Try 3 calls in half-open
                .recordExceptions(IOException.class, TimeoutException.class)
                .build())
            .timeLimiterConfig(TimeLimiterConfig.custom()
                .timeoutDuration(Duration.ofSeconds(5))  // 5 second timeout
                .build())
            .build());
    }
}
```

## Step 3: Use the Circuit Breaker

```java
@Service
public class OrderService {

    private final RestClient restClient;

    public OrderService(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    @CircuitBreaker(name = "inventoryService", fallbackMethod = "inventoryFallback")
    @TimeLimiter(name = "inventoryService")
    @Retry(name = "inventoryService", fallbackMethod = "inventoryFallback")
    public CompletableFuture<InventoryResponse> checkInventory(String productId) {
        return CompletableFuture.supplyAsync(() ->
            restClient.get()
                .uri("http://inventory-service/api/products/{id}/stock", productId)
                .retrieve()
                .body(InventoryResponse.class)
        );
    }

    // Fallback when circuit is open or request times out
    public CompletableFuture<InventoryResponse> inventoryFallback(
            String productId, Throwable t) {
        logger.warn("Inventory check failed for {}: {}", productId, t.getMessage());
        return CompletableFuture.completedFuture(
            new InventoryResponse(productId, 0, "UNAVAILABLE")
        );
    }
}
```

## Step 4: Bulkhead Pattern

Prevent one service from exhausting all threads:

```java
@Configuration
public class BulkheadConfig {

    @Bean
    public BulkheadConfig bulkheadConfig() {
        return BulkheadConfig.custom()
            .maxConcurrentCalls(10)        // Max 10 concurrent calls
            .maxWaitDuration(Duration.ofMillis(500))  // Wait 500ms max
            .build();
    }
}
```

## Engineering Decision: Circuit Breaker States

**Context:** A circuit breaker has three states: CLOSED (normal), OPEN (failing), HALF_OPEN (testing).

**Decision:** We configure the circuit breaker with a 10-call sliding window, 50% failure threshold, and 30-second open state.

**Why:** These defaults balance responsiveness against stability. A 10-call window detects failures quickly without excessive tripping. 30 seconds is long enough to let downstream services recover, short enough to restore service promptly.

## Validation Checklist

- [ ] Resilience4j dependencies added to pom.xml
- [ ] Circuit breaker configuration with sliding window, threshold, and timing
- [ ] Fallback methods for all remote calls
- [ ] Retry mechanism for transient failures
- [ ] Bulkhead isolation for thread pools
- [ ] `mvn compile` passes without errors
