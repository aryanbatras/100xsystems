---
title: "Introduction & Project Setup"
order: 1
module: "Service Decomposition"
track: "spring-boot"
difficulty: "Intermediate"
estimated_time: "45 min"
learning_objectives:
  - "Understand microservices architecture principles"
  - "Set up a Spring Boot multi-module project"
  - "Create the service boundaries and project structure"
prerequisites:
  - "principles/cap-theorem"
  - "principles/solid"
  - "tools/docker"
knowledge_refs:
  - "principles/cap-theorem"
  - "patterns/strategy"
  - "tools/docker"
validation:
  - type: file-exists
    path: "pom.xml"
  - type: file-exists
    path: "docker-compose.yml"
  - type: file-contains
    path: "pom.xml"
    contains: "spring-boot-starter-web"
    description: "Has Spring Boot web dependency"
  - type: cli-command
    command: "mvn --version 2>/dev/null || echo 'Maven not found'"
    description: "Maven is available"
---

# Introduction & Project Setup

Welcome to building **Microservices** — a production-grade distributed system. By the end of this system, you'll have built a multi-service e-commerce platform with service discovery, API gateways, event-driven communication, and observability.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway (Spring Cloud Gateway)       │
├──────────┬──────────┬──────────┬──────────┬────────────────┤
│  User     │  Product  │  Order   │ Payment  │  Notification  │
│  Service  │  Service  │  Service │ Service  │  Service       │
├──────────┴──────────┴──────────┴──────────┴────────────────┤
│                    Message Broker (Kafka)                    │
├─────────────────────────────────────────────────────────────┤
│                    Service Discovery (Eureka)                │
├─────────────────────────────────────────────────────────────┤
│                    Config Server (Spring Cloud Config)       │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

Create the following multi-module Maven project:

```
microservices-platform/
├── pom.xml                    # Parent POM
├── docker-compose.yml         # Local dev infrastructure
├── services/
│   ├── user-service/
│   │   ├── pom.xml
│   │   └── src/main/java/...
│   ├── product-service/
│   │   ├── pom.xml
│   │   └── src/main/java/...
│   ├── order-service/
│   │   ├── pom.xml
│   │   └── src/main/java/...
│   ├── payment-service/
│   │   ├── pom.xml
│   │   └── src/main/java/...
│   └── notification-service/
│       ├── pom.xml
│       └── src/main/java/...
├── infrastructure/
│   ├── api-gateway/
│   ├── service-registry/
│   └── config-server/
├── design/
│   ├── decisions.md
│   └── architecture.md
└── .100x.json
```

## Step 1: Create Parent POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.hundredx</groupId>
    <artifactId>microservices-platform</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <properties>
        <java.version>21</java.version>
        <spring-cloud.version>2023.0.0</spring-cloud.version>
    </properties>

    <modules>
        <module>services/user-service</module>
        <module>services/product-service</module>
        <module>services/order-service</module>
        <module>services/payment-service</module>
        <module>services/notification-service</module>
        <module>infrastructure/api-gateway</module>
        <module>infrastructure/service-registry</module>
        <module>infrastructure/config-server</module>
    </modules>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
```

## Step 2: Create docker-compose.yml

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: microservices
      POSTGRES_PASSWORD: microservices
      POSTGRES_DB: shared
    ports:
      - "5432:5432"

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181

  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.0
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

## Key Design Decision: Service Boundaries

We identify services by **business capability** — each service owns its data, domain logic, and API contract. This follows the **Bounded Context** pattern from Domain-Driven Design.

**Why this matters:** The hardest part of microservices isn't the technology — it's knowing where to draw the lines between services. A wrong boundary leads to tight coupling, chatty communication, and a distributed monolith.

## Validation Checklist

- [ ] Parent `pom.xml` exists with all module declarations
- [ ] `docker-compose.yml` exists with Kafka, PostgreSQL, Redis
- [ ] `services/user-service/pom.xml` exists
- [ ] `services/product-service/pom.xml` exists
- [ ] `services/order-service/pom.xml` exists
- [ ] `infrastructure/api-gateway/pom.xml` exists
- [ ] `infrastructure/service-registry/pom.xml` exists
- [ ] `mvn compile` passes
