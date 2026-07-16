---
title: "Monitoring & Alerting with Prometheus & Grafana"
order: 3
module: "Observability"
track: "spring-boot"
difficulty: "Advanced"
estimated_time: "60 min"
learning_objectives:
  - "Configure Prometheus metrics collection for all services"
  - "Build Grafana dashboards for service health and latency"
  - "Set up alerting rules with AlertManager"
  - "Implement custom business metrics"
prerequisites:
  - "microservices/spring-boot/module-3/lesson-2"
knowledge_refs:
  - "tools/docker"
  - "patterns/observer"
validation:
  - type: file-exists
    path: "infrastructure/monitoring/prometheus/prometheus.yml"
  - type: file-exists
    path: "infrastructure/monitoring/grafana/dashboards/service-health.json"
  - type: file-exists
    path: "infrastructure/monitoring/alertmanager/config.yml"
  - type: file-contains
    path: "services/user-service/src/main/java/com/hundredx/userservice/metrics/CustomMetrics.java"
    contains: "MeterRegistry"
    description: "Has custom Micrometer metrics"
  - type: file-contains
    path: "infrastructure/monitoring/prometheus/prometheus.yml"
    contains: "scrape_configs"
    description: "Has Prometheus scrape config"
---

# Monitoring & Alerting with Prometheus & Grafana

In production, you can't rely on SSH-ing into servers to debug issues. A proper monitoring stack gives you real-time visibility into service health, performance, and business metrics.

## Monitoring Stack

```
┌──────────────────────────────────────────────────┐
│                  Services                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  User    │  │  Order   │  │Notificat.│       │
│  │ /metrics │  │ /metrics │  │ /metrics │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
│       │              │              │              │
│       ▼              ▼              ▼              │
│  ┌────────────────────────────────────────────┐  │
│  │           Prometheus                        │  │
│  │  (Scrapes /actuator/prometheus every 15s)  │  │
│  └────────────────┬───────────────────────────┘  │
│                   │                               │
│          ┌────────┴────────┐                     │
│          ▼                 ▼                      │
│  ┌────────────┐  ┌─────────────────┐            │
│  │  Grafana   │  │  AlertManager   │            │
│  │ Dashboards │  │  (Slack, Email, │            │
│  │  & Charts  │  │   PagerDuty)    │            │
│  └────────────┘  └─────────────────┘            │
└──────────────────────────────────────────────────┘
```

## Step 1: Prometheus Configuration

Create `infrastructure/monitoring/prometheus/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  scrape_timeout: 10s

scrape_configs:
  - job_name: 'microservices'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets:
        - 'user-service:8080'
        - 'order-service:8081'
        - 'notification-service:8082'
        - 'api-gateway:8083'
    relabel_configs:
      - source_labels: ['__address__']
        regex: '([^:]+):.*'
        target_label: 'service'
        replacement: '${1}'

  - job_name: 'infrastructure'
    static_configs:
      - targets:
        - 'kafka:9092'
        - 'postgres:5432'
```

## Step 2: Custom Micrometer Metrics

Create `services/user-service/src/main/java/com/hundredx/userservice/metrics/CustomMetrics.java`:

```java
package com.hundredx.userservice.metrics;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.stereotype.Component;

@Component
public class CustomMetrics {

    private final Counter userRegistrationCounter;
    private final Counter userLoginCounter;
    private final Timer userRegistrationTimer;
    private final Counter failedLoginCounter;

    public CustomMetrics(MeterRegistry registry) {
        this.userRegistrationCounter = registry.counter("users.registrations.total");
        this.userLoginCounter = registry.counter("users.logins.total");
        this.failedLoginCounter = registry.counter("users.logins.failed");
        this.userRegistrationTimer = registry.timer("users.registration.duration");
    }

    public void recordRegistration(Runnable registrationLogic) {
        userRegistrationCounter.increment();
        userRegistrationTimer.record(registrationLogic);
    }

    public void recordLogin(boolean success) {
        if (success) {
            userLoginCounter.increment();
        } else {
            failedLoginCounter.increment();
        }
    }
}
```

## Step 3: Grafana Dashboard

Create `infrastructure/monitoring/grafana/dashboards/service-health.json`:

A Grafana dashboard JSON that includes:
- Service Uptime panel (time series of `up{job="microservices"}`)
- Request Rate panel (rate of `http_server_requests_seconds_count`)
- Error Rate panel (rate of `http_server_requests_seconds_count{status=~"5.."}`)
- P99 Latency panel (histogram_quantile for `http_server_requests_seconds_bucket`)
- Business Metrics panel (custom counters like `users.registrations.total`)
- JVM Health panel (heap usage, GC pauses, thread states)

## Step 4: AlertManager Configuration

Create `infrastructure/monitoring/alertmanager/config.yml`:

```yaml
route:
  group_by: ['service', 'severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'slack-notifications'
  routes:
  - match:
      severity: critical
    receiver: 'pagerduty-critical'
    repeat_interval: 10m

receivers:
- name: 'slack-notifications'
  slack_configs:
  - api_url: 'https://hooks.slack.com/services/YOUR_WEBHOOK'
    channel: '#alerts'
    title: '{{ .GroupLabels.service }} - {{ .GroupLabels.severity }}'
    text: '{{ .CommonAnnotations.description }}'

- name: 'pagerduty-critical'
  pagerduty_configs:
  - routing_key: 'YOUR_PAGERDUTY_KEY'
    severity: critical
```

## Step 5: Prometheus Recording Rules

Create `infrastructure/monitoring/prometheus/rules.yml`:

```yaml
groups:
  - name: microservices.rules
    rules:
      - record: service:error_rate_5m
        expr: |
          rate(http_server_requests_seconds_count{status=~"5.."}[5m])
          /
          rate(http_server_requests_seconds_count[5m])

      - record: service:latency_p99
        expr: |
          histogram_quantile(0.99,
            rate(http_server_requests_seconds_bucket[5m])
          )

      - alert: HighErrorRate
        expr: service:error_rate_5m > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          description: "{{ $labels.service }} error rate is {{ $value | humanizePercentage }}"
```

## Engineering Decision: Pull vs Push Monitoring

**Context:** Services need to expose metrics for observability.

**Decision:** Use Prometheus pull model (services expose /metrics endpoint) instead of push-based monitoring.

**Why:** Pull model is easier to debug (curl a service directly), doesn't require services to know about monitoring infrastructure, and Prometheus handles service discovery automatically.

## Validation Checklist

- [ ] All services expose `/actuator/prometheus` endpoint
- [ ] Prometheus config has all service targets
- [ ] Custom business metrics are implemented
- [ ] Grafana dashboards display real-time metrics
- [ ] AlertManager routes to Slack for warnings, PagerDuty for criticals
- [ ] Recording rules precompute error rates and latencies
- [ ] All services start without errors
