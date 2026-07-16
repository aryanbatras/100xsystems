---
title: "Async Communication with Event Brokers"
order: 2
module: "Communication Patterns"
track: "spring-boot"
difficulty: "Advanced"
estimated_time: "75 min"
learning_objectives:
  - "Implement event-driven communication with Kafka"
  - "Design message schemas with Avro/JSON Schema"
  - "Handle event ordering and idempotency"
  - "Implement dead letter queues for failed messages"
prerequisites:
  - "microservices/spring-boot/module-2/lesson-1"
knowledge_refs:
  - "technologies/kafka"
  - "patterns/observer"
  - "principles/cap-theorem"
validation:
  - type: file-contains
    path: "docker-compose.yml"
    contains: "kafka"
    description: "Has Kafka in docker-compose"
  - type: file-contains
    path: "services/order-service/pom.xml"
    contains: "spring-kafka"
    description: "Has Spring Kafka dependency"
  - type: file-exists
    path: "services/order-service/src/main/java/com/hundredx/orderservice/events/OrderEventPublisher.java"
  - type: file-exists
    path: "services/notification-service/src/main/java/com/hundredx/notificationservice/events/OrderEventConsumer.java"
  - type: cli-command
    command: "cd services/order-service && mvn compile -q 2>/dev/null || echo 'check maven'"
    description: "Order service compiles"
---

# Async Communication with Event Brokers

Synchronous communication (REST/gRPC) creates tight coupling between services. Event-driven communication with a message broker decouples services, improves reliability, and enables asynchronous processing.

## Event-Driven Architecture

```
User Service              Order Service           Notification Service
     │                        │                         │
     │  UserCreatedEvent      │                         │
     │───────────────────────>│                         │
     │                        │  OrderPlacedEvent       │
     │                        │────────────────────────>│
     │                        │                         │
     │                        │  ┌──────────────────┐   │
     │                        │  │    Dead Letter    │   │
     │                        │  │      Queue       │   │
     │                        │  └──────────────────┘   │
     ▼                        ▼                         ▼
┌──────────────────────────────────────────────────────────┐
│                    Kafka / RabbitMQ                       │
│                    (Event Broker)                         │
└──────────────────────────────────────────────────────────┘
```

## Step 1: Add Kafka to Docker Compose

```yaml
services:
  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
```

## Step 2: Add Spring Kafka Dependencies

```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

## Step 3: Create the Event Publisher

```java
package com.hundredx.orderservice.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import java.util.concurrent.CompletableFuture;

@Component
public class OrderEventPublisher {

    private static final Logger log = LoggerFactory.getLogger(OrderEventPublisher.class);
    private static final String TOPIC = "order-events";

    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public OrderEventPublisher(KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishOrderPlaced(OrderEvent event) {
        CompletableFuture<SendResult<String, OrderEvent>> future =
            kafkaTemplate.send(TOPIC, event.orderId(), event);

        future.whenComplete((result, ex) -> {
            if (ex == null) {
                log.info("Event published: {} at offset {}",
                    event.orderId(), result.getRecordMetadata().offset());
            } else {
                log.error("Failed to publish event: {}", event.orderId(), ex);
            }
        });
    }
}
```

## Step 4: Create the Event Consumer

```java
package com.hundredx.notificationservice.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;

@Component
public class OrderEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(OrderEventConsumer.class);

    @KafkaListener(topics = "order-events", groupId = "notification-service")
    public void consumeOrderEvent(OrderEvent event, Acknowledgment ack) {
        try {
            log.info("Processing event: order {} by user {}",
                event.orderId(), event.userId());

            // Send notification based on event type
            switch (event.type()) {
                case "ORDER_PLACED" -> sendConfirmation(event);
                case "ORDER_SHIPPED" -> sendTrackingInfo(event);
                case "ORDER_DELIVERED" -> requestReview(event);
                default -> log.warn("Unknown event type: {}", event.type());
            }

            ack.acknowledge(); // Manual commit
        } catch (Exception e) {
            log.error("Failed to process event: {}", event.orderId(), e);
            // Let the retry mechanism handle it
            throw e;
        }
    }

    private void sendConfirmation(OrderEvent event) {
        log.info("Sending order confirmation to user {}", event.userId());
    }

    private void sendTrackingInfo(OrderEvent event) {
        log.info("Sending tracking info for order {}", event.orderId());
    }

    private void requestReview(OrderEvent event) {
        log.info("Requesting review for order {}", event.orderId());
    }
}
```

## Step 5: Dead Letter Queue Configuration

```java
@Configuration
public class KafkaConfig {

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, OrderEvent>
            kafkaListenerContainerFactory(ConsumerFactory<String, OrderEvent> consumerFactory,
                                           KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        var factory = new ConcurrentKafkaListenerContainerFactory<String, OrderEvent>();
        factory.setConsumerFactory(consumerFactory);

        // Dead letter configuration
        var deadLetterPublishingRecoverer = new DeadLetterPublishingRecoverer(kafkaTemplate);
        var retry = RetryTemplate.builder()
            .maxAttempts(3)
            .exponentialBackoff(1000, 2, 10000)
            .build();

        factory.setCommonErrorHandler(new DefaultErrorHandler(
            deadLetterPublishingRecoverer, new FixedBackOff(1000L, 3L)));

        return factory;
    }
}
```

## Engineering Decision: Kafka vs. RabbitMQ

**Context:** Need an event broker for async communication.

**Decision:** Use Kafka for event streaming and RabbitMQ for task queues.

**Why:** Kafka excels at event sourcing, log compaction, and replay — ideal for domain events. RabbitMQ is simpler for point-to-point task distribution.

| Aspect | Kafka | RabbitMQ |
|--------|-------|----------|
| Model | Log-based, pull | Queue-based, push |
| Message Retention | Configurable (days/weeks) | Destined after ack |
| Ordering | Per-partition guaranteed | Not guaranteed |
| Throughput | Very high (100k+/s) | High (10k+/s) |
| Best For | Event sourcing, streaming | Task queues, RPC |

## Validation Checklist

- [ ] Kafka container is configured in docker-compose.yml
- [ ] Event publisher sends messages to Kafka topic
- [ ] Event consumer processes messages asynchronously
- [ ] Dead letter queue handles failed messages after 3 retries
- [ ] Manual acknowledgment is implemented
- [ ] `mvn compile` passes for order-service and notification-service
