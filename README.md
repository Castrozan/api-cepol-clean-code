# API CEPOL

A simple API built with Hono.js, TypeScript, and SQLite.

## Features

- REST API with OpenAPI documentation
- SQLite database for data persistence
- Rate limiting
- Security headers

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create a .env file with the following content
PORT=3000
NODE_ENV=development
```

4. The database is automatically initialized when starting the application.

### Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## API Documentation

The API documentation is available at the root endpoint (`/`) when the server is running.

## Project Structure

```
src/
├── application/     # Application services and use cases
├── domain/          # Domain models and interfaces
├── infrastructure/  # External services, database, web server
│   ├── database/    # Database implementation
│   │   └── sqlite/  # SQLite configuration
│   ├── middleware/  # API middleware
│   └── web/         # Web server configuration
├── presentation/    # API controllers and DTOs
└── config/          # Application configuration
```

## Endpoints

The API provides the following endpoints:

- `/public/about` - About information (public)
- `/about` - Manage about information (authenticated)
- `/public/article` - Articles (public)
- `/article` - Manage articles (authenticated)
- `/public/equipment` - Equipment (public)
- `/equipment` - Manage equipment (authenticated)
- `/public/research` - Research (public)
- `/research` - Manage research (authenticated)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
