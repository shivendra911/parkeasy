git init

# Initial setup
git add README.md .gitignore project_guide.md folderstructure.md
git commit -m "docs: add initial project documentation and gitignore"

# Backend setup
git add backend/pom.xml backend/src/main/resources/application.yml backend/src/main/java/com/parkeasy/backend/ParkeasyApplication.java
git commit -m "build: initialize Spring Boot backend"

# Docker setup
git add docker-compose.yml
git commit -m "ci: add docker-compose for mysql database"

# Flyway migrations
git add backend/src/main/resources/db/migration/V1__Create_Initial_Schema.sql
git commit -m "feat: add initial database schema migration"

git add backend/src/main/resources/db/migration/V2__Insert_Initial_Data.sql
git commit -m "feat: add initial seed data for roles and parking"

git add backend/src/main/resources/db/migration/V3__Insert_Spots_Data.sql
git commit -m "feat: add initial seed data for parking spots"

# Entities
git add backend/src/main/java/com/parkeasy/backend/domain/Role.java
git commit -m "feat: add Role entity"

git add backend/src/main/java/com/parkeasy/backend/domain/User.java
git commit -m "feat: add User entity with many-to-many role mapping"

git add backend/src/main/java/com/parkeasy/backend/domain/Parking.java
git commit -m "feat: add Parking entity"

git add backend/src/main/java/com/parkeasy/backend/domain/Spot.java
git commit -m "feat: add Spot entity"

git add backend/src/main/java/com/parkeasy/backend/domain/Booking.java
git commit -m "feat: add Booking entity"

# Repositories
git add backend/src/main/java/com/parkeasy/backend/repository/RoleRepository.java backend/src/main/java/com/parkeasy/backend/repository/UserRepository.java
git commit -m "feat: add user and role repositories"

git add backend/src/main/java/com/parkeasy/backend/repository/ParkingRepository.java
git commit -m "feat: add parking repository"

git add backend/src/main/java/com/parkeasy/backend/repository/SpotRepository.java
git commit -m "feat: add spot repository"

git add backend/src/main/java/com/parkeasy/backend/repository/BookingRepository.java
git commit -m "feat: add booking repository"

# Exceptions
git add backend/src/main/java/com/parkeasy/backend/exception/
git commit -m "feat: add custom exception classes"

# DTOs
git add backend/src/main/java/com/parkeasy/backend/dto/request/
git commit -m "feat: add request DTOs for API payloads"

git add backend/src/main/java/com/parkeasy/backend/dto/response/
git commit -m "feat: add response DTOs for API endpoints"

# Mappers
git add backend/src/main/java/com/parkeasy/backend/mapper/
git commit -m "feat: add DTO to entity mappers"

# Security setup
git add backend/src/main/java/com/parkeasy/backend/security/CustomUserDetails.java backend/src/main/java/com/parkeasy/backend/security/CustomUserDetailsService.java
git commit -m "feat: add custom user details service"

git add backend/src/main/java/com/parkeasy/backend/security/JwtTokenProvider.java backend/src/main/java/com/parkeasy/backend/security/JwtAuthenticationFilter.java backend/src/main/java/com/parkeasy/backend/security/JwtAuthenticationEntryPoint.java
git commit -m "feat: add JWT token generation and authentication filter"

git add backend/src/main/java/com/parkeasy/backend/config/SecurityConfig.java
git commit -m "feat: configure spring security and CORS"

# Services
git add backend/src/main/java/com/parkeasy/backend/service/AuthService.java backend/src/main/java/com/parkeasy/backend/service/impl/AuthServiceImpl.java
git commit -m "feat: add authentication service for login and registration"

git add backend/src/main/java/com/parkeasy/backend/service/UserService.java backend/src/main/java/com/parkeasy/backend/service/impl/UserServiceImpl.java
git commit -m "feat: add user service to manage profiles"

git add backend/src/main/java/com/parkeasy/backend/service/ParkingService.java backend/src/main/java/com/parkeasy/backend/service/impl/ParkingServiceImpl.java
git commit -m "feat: add parking service with availability calculations"

git add backend/src/main/java/com/parkeasy/backend/service/SpotService.java backend/src/main/java/com/parkeasy/backend/service/impl/SpotServiceImpl.java
git commit -m "feat: add spot service to handle spot retrieval"

git add backend/src/main/java/com/parkeasy/backend/service/BookingService.java backend/src/main/java/com/parkeasy/backend/service/impl/BookingServiceImpl.java
git commit -m "feat: add booking service to handle reservations"

# Controllers
git add backend/src/main/java/com/parkeasy/backend/controller/AuthController.java
git commit -m "feat: add auth controller"

git add backend/src/main/java/com/parkeasy/backend/controller/UserController.java
git commit -m "feat: add user controller"

git add backend/src/main/java/com/parkeasy/backend/controller/ParkingController.java
git commit -m "feat: add parking controller"

git add backend/src/main/java/com/parkeasy/backend/controller/SpotController.java
git commit -m "feat: add spot controller"

git add backend/src/main/java/com/parkeasy/backend/controller/BookingController.java
git commit -m "feat: add booking controller"

# Frontend setup
git add frontend/package.json frontend/vite.config.js
git commit -m "build: initialize Vite React frontend"

git add frontend/index.html frontend/src/main.jsx frontend/src/App.jsx
git commit -m "feat: setup basic React app entry points"

git add frontend/src/index.css frontend/tailwind.config.js frontend/eslint.config.js
git commit -m "feat: configure Tailwind CSS and global styles"

# Frontend Auth Context & API Client
git add frontend/src/services/apiClient.js
git commit -m "feat: add axios API client with JWT interceptor"

git add frontend/src/context/AuthContext.jsx
git commit -m "feat: add authentication context provider"

# Frontend Components
git add frontend/src/components/ProtectedRoute.jsx
git commit -m "feat: add protected route wrapper"

git add frontend/src/components/Navbar.jsx
git commit -m "feat: add responsive navigation bar"

# Frontend Pages
git add frontend/src/pages/LandingPage.jsx
git commit -m "feat: add landing page UI"

git add frontend/src/pages/Auth.jsx
git commit -m "feat: add login and registration forms"

git add frontend/src/pages/Parkings.jsx
git commit -m "feat: add parking location browser"

git add frontend/src/pages/SpotSelection.jsx
git commit -m "feat: add parking spot selection grid"

git add frontend/src/pages/Checkout.jsx
git commit -m "feat: add checkout page for booking confirmation"

git add frontend/src/pages/Dashboard.jsx
git commit -m "feat: add user dashboard for profile and bookings"

# Any remaining files
git add -A
git commit -m "chore: add remaining config and static files"
