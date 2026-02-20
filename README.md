# Dispute Management System

## Overview

The **Dispute Management System** is designed to handle financial transaction disputes in a structured and automated way. It integrates multiple design patterns to ensure flexibility, maintainability, and scalability:

- **Chain of Responsibility**: Validates transactions through a chain of handlers (`AlreadyDisputedHandler`, `FraudValidationHandler`) to enforce business rules.
- **Strategy Pattern**: Applies different dispute resolution strategies (e.g., automatic refund, manual review) based on transaction attributes.
- **Command Pattern**: Executes the selected strategy in a decoupled way.
- **Observer Pattern**: Publishes notifications after dispute processing, enabling other systems to react to dispute events.

The system ensures that:

- Transactions cannot be disputed multiple times.
- High-risk or fraudulent transactions are automatically flagged or rejected.
- Dispute resolution strategies can be extended without modifying core logic.

- **Angular Frontend uses a centralized environment file** (`SystemEnvironment`) to manage API base URL and endpoints.

---

## System Architecture

```
+-------------------+          +--------------------+
|  Angular Frontend | <------> | Spring Boot Backend|
|  (OpenDispute UI) |          | (DisputeService)  |
+-------------------+          +--------------------+
         |                               |
         | HTTP Requests                  |
         v                               v
      REST API endpoints             Transaction Repository
      Dispute Requests               (JPA/Hibernate)
```

Key modules:

1. **Frontend (Angular)**  
   - Provides a user interface to select transactions, enter reasons, and open disputes.
   - Uses `SystemEnvironment` to centralize API URLs:

```ts
export const SystemEnvironment = {
  BASE_URL: 'http://localhost:8080/api',
  ENDPOINTS: {
    TRANSACTIONS: '/transactions',
    DISPUTES: '/disputes'
  }
};
```

   - Handles form validation and displays backend error messages.

2. **Backend (Spring Boot)**  
   - Exposes REST endpoints for transaction and dispute management.
   - Implements validation rules, dispute resolution strategies, and observer notifications.
   - Stores transaction and dispute data in a relational database (e.g., PostgreSQL, H2 for dev).

---

## Docker Deployment

### Prerequisites

- Docker installed on your machine
- Docker Compose (optional, if running backend and frontend together)
- Node.js installed (for building Angular frontend)
- Maven installed (for building Spring Boot backend)

### Step 1: Build Angular Frontend Docker Image

1. Navigate to the Angular project folder:

```bash
cd dispute-portal
```

2. Build the Angular production files:

```bash
ng build --configuration production
```

3. Create a `Dockerfile` in the Angular project root:

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
# 1. Match the name "builder" 
# 2. Point to the "/browser" subfolder for static hosting
COPY --from=builder /app/dist/dispute-portal/browser /usr/share/nginx/html

# 3. Add routing fix (prevents 404s on refresh)
RUN sed -i 's|index  index.html index.htm;|index  index.html index.htm; try_files $uri $uri/ /index.html;|g' /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

4. Build and run the Docker image:

```bash
docker build -t angular-app .
docker run -d -p 4200:80 angular-app
```

### Step 2: Build Spring Boot Backend Docker Image

1. Navigate to the Spring Boot project folder:

```bash
cd dispute
```

2. Create a `Dockerfile` in the Spring Boot project root:

```dockerfile
# --- STAGE 1: Build (The "builder" stage) ---
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# 1. Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# 2. Build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# --- STAGE 2: Run (The final slim image) ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# 3. Copy the result FROM the builder stage into this new stage
COPY --from=builder /app/target/dispute-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

3. Build and run the Docker image:

```bash
mvn clean package -DskipTests
docker build -t dispute .
docker run -d -p 8080:8080 dispute
```


- Access Angular UI: `http://localhost:4200`  
- Backend API: `http://localhost:8080`

### Step 4: Connecting Frontend to Backend

- Angular uses `SystemEnvironment.BASE_URL` for backend calls:

```ts
apiUrl: SystemEnvironment.BASE_URL + SystemEnvironment.ENDPOINTS.DISPUTES;
```

- This allows dynamic switching between environments (dev, staging, production).

---

## Summary

- **Frontend**: Angular app served via Nginx, uses `SystemEnvironment` for API URLs.  
- **Backend**: Spring Boot REST API with full dispute management logic.  
- **Dispute Logic**: Chain of Responsibility, Strategy, Command, Observer.  
- **Database**: Any relational DB (PostgreSQL recommended) or H2 for dev.  
- **Deployment**: Docker images or Docker Compose to run both services together.

This setup ensures a **fully containerized, modular, and maintainable system** ready for production or testing.

