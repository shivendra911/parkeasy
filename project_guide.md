# Project: Rebuild ParkEasy from Scratch (Spring Boot + React, MySQL)

## Context
I'm rebuilding an existing project called ParkWhizz — a parking spot booking
platform — from the ground up under a new name: ParkEasy. The old
codebase (Spring Boot backend + React/Vite frontend, MongoDB) had structural,
naming, and security problems I want to leave behind rather than patch. This
is a fresh implementation, not a migration script — copy proven business
logic and UI, but do not carry over the old architecture, package names, or
mistakes described below.

Reference repo (for business logic and feature reference only — do not clone
its structure): https://github.com/princee09/ParkWhizz

## Goal
Produce a clean, professional, two-project monorepo:
- `backend/` — Spring Boot 4.x, Java 21, Maven, MySQL + JPA + Flyway
- `frontend/` — React 18 + Vite, Tailwind CSS

Both must build and run independently. This is a portfolio-quality project —
optimize for correctness, conventional structure, and security, not speed of
delivery.

## Repo layout

parkeasy/
├── backend/
├── frontend/
├── .github/workflows/
│ ├── backend-ci.yml
│ └── frontend-ci.yml
├── docker-compose.yml
└── README.md


## Backend requirements

### Scaffold
Generate via Spring Initializr (start.spring.io) equivalent with:
- Group: `com.parkeasy`
- Artifact/Package: `com.parkeasy.backend`
- Java 21, Spring Boot 4.x, Maven, Jar packaging
- Dependencies: Spring Web, Spring Security, Spring Data JPA, MySQL Driver,
  Validation, OAuth2 Client, Flyway, Lombok, Spring Boot DevTools
- Do NOT include MongoDB, H2, or generic JDBC starter — one persistence
  stack only (JPA + MySQL).

### Package structure (enforce this exactly)

com.parkeasy.backend
├── config/ # SecurityConfig, CorsConfig, AsyncConfig, OpenApiConfig
├── controller/ # thin controllers, no business logic
├── service/ # interfaces
│ └── impl/ # implementations, suffixed "...ServiceImpl" (not "Imple")
├── repository/ # Spring Data JPA repositories
├── domain/ # @Entity classes — plain persistence models only
├── dto/
│ ├── request/
│ └── response/
├── mapper/ # explicit entity <-> DTO mapping, not ad-hoc ModelMapper calls
├── security/ # JWT filter, entry point, UserPrincipal
├── exception/ # custom exceptions + GlobalExceptionHandler
└── util/


### Data model (MySQL/JPA — not documents)
Model these as proper relational entities with real foreign keys:
- `User` (plain entity, does NOT implement UserDetails — see security below)
- `Role` — many-to-many with User via a join table
- `CarParking` / `Parking` (lots)
- `Spot` (many-to-one to a parking lot)
- `Booking` (many-to-one to User and Spot)
- Use camelCase field names throughout (firstName, not first_name).
- Add Flyway migrations under `src/main/resources/db/migration/` starting
  with `V1__init_schema.sql`. Do not use `ddl-auto=update` in any profile —
  set `spring.jpa.hibernate.ddl-auto=validate` and let Flyway own the schema.
- Booking creation must guard against double-booking a spot (use a DB
  constraint and/or pessimistic locking / optimistic locking with @Version —
  pick whichever you think fits best and explain why).

### Security (fix these specific issues from the old repo)
- JWT signing secret must come from `application.properties` /
  environment variable (`jwt.secret=${JWT_SECRET}`), never hardcoded in
  source. Generate a fresh random secret for local dev in the `.example`
  file, clearly marked as a placeholder.
- Security filter chain must default-deny: only auth endpoints
  (`/api/v1/auth/**` or similar — register/login/refresh) are `permitAll()`.
  Everything else requires authentication. Admin/seed/cron-style endpoints
  additionally require `@PreAuthorize("hasRole('ADMIN')")`.
- Use constructor injection (`@RequiredArgsConstructor` on final fields)
  everywhere instead of field-level `@Autowired`.
- `User` entity must NOT implement `UserDetails`. Create a separate
  `UserPrincipal implements UserDetails` that wraps `User` for Spring
  Security, so persistence and auth concerns stay decoupled.
- Add a catch-all `@ExceptionHandler(Exception.class)` in
  GlobalExceptionHandler so unhandled exceptions never leak stack traces.
- No `System.out.println` / `printStackTrace()` — use SLF4J logger
  everywhere.

### Other requirements
- Add springdoc-openapi for auto-generated API docs.
- Commit the Maven wrapper (`mvnw`, `mvnw.cmd`, `.mvn/`) — do not gitignore it.
- Write tests as you build each layer, not after: unit tests for services
  (Mockito), MockMvc integration tests for controllers WITH security
  enabled (this should have caught the old "everything is permitAll" bug —
  don't disable security in test config just to make tests pass).
- application.properties.example should show MySQL connection config,
  clearly commented, with no real credentials.

## Frontend requirements

### Scaffold
`npm create vite@latest frontend -- --template react`, then add
Tailwind CSS, axios, react-router-dom.

### Structure
Carry over the page/component/service split from the old frontend
(`components/`, `pages/`, `services/`) since that part was already
reasonable — but:
- Point `services/apiClient.js` at the new backend's base URL via
  `.env.local` (gitignored), with `.env.example` committed.
- Confirm CORS allowed origins in the backend's SecurityConfig match the
  Vite dev port (5173) and whatever production URL we deploy to.
- Re-check Tailwind config against whatever version gets installed fresh
  (v3 vs v4 config formats differ) — don't blindly copy the old config file
  if it's now incompatible.

## Process — how I want you to work
1. First, generate a written plan (file structure, entity/relationship
   diagram, list of endpoints) and show it to me before writing code.
2. Build the backend bottom-up: domain entities → repositories → DTOs/mappers
   → services → security → controllers → tests. Confirm it compiles at each
   stage before moving to the next.
3. Then build the frontend, wiring it to the running backend.
4. Set up docker-compose (app + MySQL) so the whole thing runs locally with
   one command.
5. Update the two GitHub Actions workflows to build/test both projects on
   push.

## Important: you are not just an implementer here
Where anything above conflicts with current best practice, or you know a
better approach than what I've specified (a different locking strategy for
bookings, a better package layout, a security library, a cleaner way to
structure the DTO/mapper layer, testing tools, etc.), tell me — don't just
silently follow the spec if you think it's suboptimal. Flag it, explain the
tradeoff in a sentence or two, and recommend what you'd do instead. I'd
rather hear "I'd do X instead of Y because Z" than have you implement
something you think is worse just because I wrote it down first. Ask before
making a call that's expensive to reverse (e.g., architecture, DB engine,
auth strategy) — but for smaller implementation choices, use your judgment
and just explain what you picked and why afterward.