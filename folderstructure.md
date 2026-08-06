parkeasy/
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       └── frontend-ci.yml
├── .gitignore
├── docker-compose.yml
├── README.md
│
├── backend/
│   ├── .mvn/
│   │   └── wrapper/
│   │       ├── maven-wrapper.jar
│   │       └── maven-wrapper.properties
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/parkeasy/backend/
│   │   │   │   ├── BackendApplication.java
│   │   │   │   │
│   │   │   │   ├── config/
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── CorsConfig.java
│   │   │   │   │   ├── AsyncConfig.java
│   │   │   │   │   └── OpenApiConfig.java
│   │   │   │   │
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── UserController.java
│   │   │   │   │   ├── ParkingController.java
│   │   │   │   │   ├── SpotController.java
│   │   │   │   │   ├── BookingController.java
│   │   │   │   │   └── AdminController.java
│   │   │   │   │
│   │   │   │   ├── service/
│   │   │   │   │   ├── UserService.java
│   │   │   │   │   ├── ParkingService.java
│   │   │   │   │   ├── SpotService.java
│   │   │   │   │   ├── BookingService.java
│   │   │   │   │   └── impl/
│   │   │   │   │       ├── UserServiceImpl.java
│   │   │   │   │       ├── ParkingServiceImpl.java
│   │   │   │   │       ├── SpotServiceImpl.java
│   │   │   │   │       └── BookingServiceImpl.java
│   │   │   │   │
│   │   │   │   ├── repository/
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── RoleRepository.java
│   │   │   │   │   ├── ParkingRepository.java
│   │   │   │   │   ├── SpotRepository.java
│   │   │   │   │   └── BookingRepository.java
│   │   │   │   │
│   │   │   │   ├── domain/
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── Role.java
│   │   │   │   │   ├── Parking.java
│   │   │   │   │   ├── Spot.java
│   │   │   │   │   └── Booking.java
│   │   │   │   │
│   │   │   │   ├── dto/
│   │   │   │   │   ├── request/
│   │   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   │   ├── BookingRequest.java
│   │   │   │   │   │   └── SpotRequest.java
│   │   │   │   │   └── response/
│   │   │   │   │       ├── ApiResponse.java
│   │   │   │   │       ├── AuthResponse.java
│   │   │   │   │       ├── UserResponse.java
│   │   │   │   │       └── BookingResponse.java
│   │   │   │   │
│   │   │   │   ├── mapper/
│   │   │   │   │   ├── UserMapper.java
│   │   │   │   │   ├── ParkingMapper.java
│   │   │   │   │   └── BookingMapper.java
│   │   │   │   │
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   ├── JwtAuthenticationEntryPoint.java
│   │   │   │   │   ├── UserPrincipal.java
│   │   │   │   │   └── CustomUserDetailsService.java
│   │   │   │   │
│   │   │   │   ├── exception/
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   │   └── SpotUnavailableException.java
│   │   │   │   │
│   │   │   │   └── util/
│   │   │   │       └── OtpGenerator.java
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.yml.example
│   │   │       ├── application-dev.yml.example
│   │   │       ├── application-prod.yml.example
│   │   │       └── db/
│   │   │           └── migration/
│   │   │               ├── V1__init_schema.sql
│   │   │               ├── V2__add_roles.sql
│   │   │               └── V3__add_bookings.sql
│   │   │
│   │   └── test/
│   │       ├── java/com/parkeasy/backend/
│   │       │   ├── BackendApplicationTests.java
│   │       │   ├── service/
│   │       │   │   ├── UserServiceTest.java
│   │       │   │   └── BookingServiceTest.java
│   │       │   ├── controller/
│   │       │   │   ├── AuthControllerTest.java
│   │       │   │   └── BookingControllerTest.java
│   │       │   └── security/
│   │       │       └── JwtTokenProviderTest.java
│   │       └── resources/
│   │           └── application-test.yml
│   │
│   └── target/          (gitignored)
│
└── frontend/
    ├── public/
    │   └── _redirects
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   │
    │   ├── components/
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Input.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProfileDropdown.jsx
    │   │
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── AuthPage.jsx
    │   │   ├── BrowsePage.jsx
    │   │   ├── SpotDetailsPage.jsx
    │   │   ├── BookingsPage.jsx
    │   │   ├── BookingDetailPage.jsx
    │   │   └── ProfilePage.jsx
    │   │
    │   └── services/
    │       ├── apiClient.js
    │       └── api.js
    │
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    ├── package.json
    ├── package-lock.json
    ├── .env.example
    └── .gitignore