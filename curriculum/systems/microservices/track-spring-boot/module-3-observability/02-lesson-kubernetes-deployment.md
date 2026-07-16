---
title: "Kubernetes Deployment & Orchestration"
order: 2
module: "Observability"
track: "spring-boot"
difficulty: "Advanced"
estimated_time: "90 min"
learning_objectives:
  - "Containerize microservices with Docker for production"
  - "Deploy to Kubernetes with Deployments and Services"
  - "Implement ConfigMaps and Secrets for configuration"
  - "Set up Horizontal Pod Autoscaling (HPA)"
prerequisites:
  - "microservices/spring-boot/module-3/lesson-1"
knowledge_refs:
  - "tools/docker"
  - "tools/kubernetes"
  - "patterns/strategy"
validation:
  - type: file-exists
    path: "k8s/user-service/deployment.yaml"
  - type: file-exists
    path: "k8s/user-service/service.yaml"
  - type: file-exists
    path: "k8s/order-service/deployment.yaml"
  - type: file-exists
    path: "k8s/order-service/service.yaml"
  - type: file-contains
    path: "k8s/user-service/deployment.yaml"
    contains: "readinessProbe"
    description: "Has readiness probe configured"
  - type: file-exists
    path: "k8s/config/application-configmap.yaml"
  - type: docker
    check: run
    dockerfile: "Dockerfile"
    command: "ls /app"
    tag: "100x-microservices-test"
    mount_source: false
---

# Kubernetes Deployment & Orchestration

Running microservices in production requires orchestration. Kubernetes provides deployment, scaling, service discovery, and self-healing for containerized applications.

## Kubernetes Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Kubernetes Cluster                  │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Ingress  │  │ Ingress  │  │          │          │
│  │  Nginx   │  │          │  │ ConfigMap│          │
│  └────┬─────┘  └──────────┘  │ Secrets  │          │
│       │                      └──────────┘          │
│       ▼                                             │
│  ┌────────────┐      ┌────────────┐                │
│  │ User Service│      │Order Service│               │
│  │ ────────   │      │ ────────   │               │
│  │ Pod  │ Pod │      │ Pod  │ Pod │               │
│  │ 8080 │ 8080 │      │ 8081 │ 8081 │               │
│  └──────┴─────┘      └──────┴─────┘                │
│         │                    │                      │
│         ▼                    ▼                      │
│  ┌──────────────────────────────────────┐          │
│  │         PostgreSQL + Kafka            │          │
│  │         (StatefulSets)               │          │
│  └──────────────────────────────────────┘          │
└─────────────────────────────────────────────────────┘
```

## Step 1: Create Dockerfiles for Each Service

```dockerfile
# Dockerfile
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Step 2: Kubernetes Deployments

```yaml
# k8s/user-service/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  namespace: microservices
spec:
  replicas: 2
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: hundredx/user-service:latest
        ports:
        - containerPort: 8080
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 20
          periodSeconds: 5
```

## Step 3: Kubernetes Services

```yaml
# k8s/user-service/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: user-service
  namespace: microservices
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP
```

## Step 4: ConfigMaps and Secrets

```yaml
# k8s/config/application-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: microservices
data:
  SPRING_PROFILES_ACTIVE: "k8s"
  SERVER_PORT: "8080"
  EUREKA_CLIENT_ENABLED: "false"
  SPRING_KAFKA_BOOTSTRAP_SERVERS: "kafka:9092"
  SPRING_DATASOURCE_URL: "jdbc:postgresql://postgres:5432/users"
```

## Step 5: Horizontal Pod Autoscaling

```yaml
# k8s/user-service/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: user-service-hpa
  namespace: microservices
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: user-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

## Engineering Decision: Readiness vs Liveness Probes

**Context:** Kubernetes needs to know when a pod is alive vs ready to serve traffic.

**Decision:** Separate liveness (is the app running?) and readiness (can it serve requests?) probes.

**Why:** A service might be running but not ready (e.g., warming a cache, connecting to a database). Kubernetes routes traffic only to ready pods, while restarting unresponsive ones via liveness probes.

## Validation Checklist

- [ ] Dockerfile builds and runs successfully
- [ ] Kubernetes Deployments have resource limits and probes
- [ ] Services expose pods via ClusterIP
- [ ] ConfigMap stores environment-specific configuration
- [ ] HPA scales based on CPU/memory utilization
- [ ] `kubectl apply -f k8s/` deploys without errors
