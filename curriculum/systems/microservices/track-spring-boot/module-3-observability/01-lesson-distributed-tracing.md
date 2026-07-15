---
title: "Observability: Distributed Tracing & Monitoring"
order: 1
module: "Observability"
track: "spring-boot"
difficulty: "Advanced"
estimated_time: "60 min"
learning_objectives:
  - "Implement distributed tracing with Micrometer and Zipkin"
  - "Set up centralized logging with structured log formats"
  - "Build health checks and readiness probes"
  - "Create dashboards with metrics aggregation"
prerequisites:
  - "microservices/spring-boot/module-2/lesson-1"
knowledge_refs:
  - "tools/docker"
  - "principles/acid"
validation:
  - type: file-contains
    path: "docker-compose.yml"
    contains: "zipkin"
    description: "Has Zipkin for distributed tracing"
  - type: file-contains
    path: "services/order-service/pom.xml"
    contains: "micrometer-tracing"
    description: "Has Micrometer tracing dependency"
  - type: file-exists
    path: "infrastructure/monitoring/grafana/dashboards.json"
  - type: file-exists
    path: "infrastructure/monitoring/prometheus/prometheus.yml"
  - type: file-exists
    path: "services/order-service/src/main/resources/application.yml"
  - type: file-contains
    path: "services/order-service/src/main/resources/application.yml"
    contains: "management.endpoints"
    description: "Actuator endpoints are configured"
---

# Observability: Distributed Tracing & Monitoring

Observability is the ability to understand what's happening inside a distributed system by examining its outputs — logs, metrics, and traces. This is critical for debugging and performance optimization in microservices.

## The Three Pillars of Observability

```
Request → Service A → Service B → Service C → Database
              │            │            │
              ▼            ▼            ▼
           Trace ├─────── Span ───────┤
                      ┌──────┴──────┐
                      │   Context    │
                      │ Propagation  │
                      └─────────────┘
```

## Step 1: Add Zipkin to Docker Compose

Add to `docker-compose.yml`:

```yaml
services:
  zipkin:
    image: openzipkin/zipkin:3.0
    ports:
      - "9411:9411"

  # Tracing dependencies
  grafana:
    image: grafana/grafana:10.2
    ports:
      - "3001:3000"
    volumes:
      - ./infrastructure/monitoring/grafana:/etc/grafana/provisioning

  prometheus:
    image: prom/prometheus:v2.48
    ports:
      - "9090:9090"
    volumes:
      - ./infrastructure/monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
```

## Step 2: Add Tracing Dependencies

```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-bridge-brave</artifactId>
</dependency>
<dependency>
    <groupId>io.zipkin.reporter2</groupId>
    <artifactId>zipkin-reporter-brave</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

## Step 3: Tracing Configuration

```java
package com.hundredx.orderservice.config;

import io.micrometer.observation.annotation.Observed;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ObservabilityConfig {

    @Bean
    @Observed(name = "order.service")
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

## Validation Checklist

- [ ] Zipkin container is configured in docker-compose.yml
- [ ] All services have Micrometer tracing dependencies
- [ ] Traces propagate across service boundaries
- [ ] Prometheus metrics endpoint is exposed
- [ ] Grafana dashboards are provisioned
- [ ] Health check endpoint returns service status
