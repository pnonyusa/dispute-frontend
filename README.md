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
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

4. Build and run the Docker image:

```bash
docker build -t angular-dispute-ui .
docker run -d -p 4200:80 angular-dispute-ui
```

### Step 2: Build Spring Boot Backend Docker Image

1. Navigate to the Spring Boot project folder:

```bash
cd dispute
```

2. Create a `Dockerfile` in the Spring Boot project root:

```dockerfile
FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=target/dispute-backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

3. Build and run the Docker image:

```bash
mvn clean package -DskipTests
docker build -t springboot-dispute-backend .
docker run -d -p 8080:8080 springboot-dispute-backend
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

