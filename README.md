<div align="center">
  <img src="https://img.icons8.com/color/144/000000/parking.png" alt="ParkEasy Logo" width="100"/>
  <h1>ParkEasy 🅿️</h1>
  <p><strong>A Next-Generation Smart Parking Reservation Platform</strong></p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#api-documentation">API Docs</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java" alt="Java 21" />
    <img src="https://img.shields.io/badge/Spring_Boot-4.x-6DB33F?style=for-the-badge&logo=spring" alt="Spring Boot" />
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  </p>
</div>

---

## 🌟 Overview

**ParkEasy** is a full-stack, modern web application designed to solve urban parking challenges. It provides a seamless, real-time experience for users to discover, reserve, and manage parking spots across various city locations. Built with a robust **Spring Boot** backend and a beautiful, glassmorphic **React** frontend, it demonstrates enterprise-grade architecture while prioritizing user experience.

## ✨ Features

- **🚀 Real-Time Availability:** Instantly view how many spots are available at any parking location.
- **🗺️ Interactive Spot Selection:** Visual grid interface showing exact spots (Available vs. Occupied).
- **🔒 Secure Authentication:** JWT-based stateless authentication with strict Role-Based Access Control (RBAC).
- **🛡️ Double-Booking Prevention:** Concurrency control at the database level to guarantee your spot.
- **🎨 Premium UI/UX:** Stunning glassmorphism design, vibrant micro-animations, and fully responsive layouts.
- **📱 Mobile Ready:** Enjoy a native-feeling experience on any device.

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS v4, Lucide React | High-performance SPA with modern aesthetics. |
| **Backend** | Java 21, Spring Boot 4.0, Spring Security | Scalable, robust RESTful API. |
| **Database** | MySQL 8.0, Spring Data JPA | Relational data persistence with Hibernate. |
| **Migrations** | Flyway | Version-controlled database schema and seeding. |
| **Auth** | JWT (JSON Web Tokens) | Stateless, secure endpoint protection. |
| **DevOps** | Docker, Docker Compose | Containerized environments for 1-click startup. |

## 🏗️ Architecture

The backend is built using a clean, layered architecture:
- **Controllers:** Handles HTTP requests and response mapping.
- **Services:** Contains core business logic and validations.
- **Repositories:** Interfaces with the MySQL database using Spring Data JPA.
- **Mappers:** Transforms Database Entities into concise Data Transfer Objects (DTOs).

## 🚀 Getting Started

### Prerequisites
- **Java 21+**
- **Node.js 20+**
- **MySQL 8.0+** (or use Docker)

### 🐳 Quick Start (Docker)

The fastest way to run the application is using the provided Docker Compose configuration.

```bash
# Start MySQL database, Spring Boot API, and Vite Dev Server
docker compose up -d
```
* Backend runs on `http://localhost:8080`
* Frontend runs on `http://localhost:5173`

### 💻 Manual Setup

#### 1. Backend (Spring Boot)
```bash
cd backend

# Copy config and fill in your MySQL credentials (if not using docker)
cp src/main/resources/application.yml.example src/main/resources/application.yml

# Build and start the server
./mvnw spring-boot:run
```

#### 2. Frontend (React + Vite)
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📖 API Documentation

The backend exposes a fully documented OpenAPI specification. Once the Spring Boot application is running, you can interact with the API via Swagger UI:

- **Swagger UI:** [http://localhost:8080/api/v1/swagger-ui.html](http://localhost:8080/api/v1/swagger-ui.html)
- **OpenAPI JSON:** [http://localhost:8080/api/v1/v3/api-docs](http://localhost:8080/api/v1/v3/api-docs)

## 👤 Test Accounts

The database comes pre-seeded with test data so you can log in immediately:
- **Email:** `john.doe@example.com`
- **Password:** `password123`

## 📄 License

This project is open-source and created for educational and portfolio purposes. Feel free to fork and modify!
