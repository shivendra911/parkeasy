# ParkEasy 🅿️

A modern parking spot booking platform built with **Spring Boot** and **React**.

## Tech Stack

| Layer    | Technology                                    |
|----------|-----------------------------------------------|
| Backend  | Java 21, Spring Boot 4.x, Spring Security, JPA |
| Database | MySQL 8.0, Flyway migrations                  |
| Frontend | React 18, Vite, Tailwind CSS v4               |
| Auth     | JWT (stateless)                                |
| CI/CD    | GitHub Actions                                 |
| DevOps   | Docker Compose                                 |

## Project Structure

```
parkeasy/
├── backend/          # Spring Boot API
├── frontend/         # React + Vite SPA
├── .github/workflows/
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Java 21+
- Node.js 20+
- MySQL 8.0+ (or use Docker)

### Quick Start (Docker)

```bash
docker compose up -d
```

This starts MySQL, the backend API (port 8080), and the frontend dev server (port 5173).

### Manual Setup

#### Backend

```bash
cd backend

# Copy config and fill in your MySQL credentials
cp src/main/resources/application.yml.example src/main/resources/application.yml

# Build and run
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

#### Frontend

```bash
cd frontend

# Copy env config
cp .env.example .env.local

# Install dependencies and start dev server
npm install
npm run dev
```

The frontend dev server runs at `http://localhost:5173` and proxies API calls to `http://localhost:8080`.

## API Documentation

Once the backend is running, access the auto-generated API docs at:
- Swagger UI: `http://localhost:8080/api/v1/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/api/v1/v3/api-docs`

## License

This project is for portfolio/educational purposes.
