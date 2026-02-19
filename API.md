# API Documentation

## Base URL
- Production: `https://movie2-eight-olive.vercel.app/api`
- Local: `http://localhost:5000/api`

## Authentication Endpoints

### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890" // optional
}
```

**Response (201):**
```json
{
  "message": "User created successfully."
}
```

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/auth/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

## Movie Endpoints

### GET /api/movies/search?q=movie_name
Search for movies by title.

**Query Parameters:**
- `q` (required): Movie title to search

**Response (200):**
```json
{
  "movies": [
    {
      "Title": "Movie Name",
      "Year": "2024",
      "imdbID": "tt1234567",
      "Type": "movie",
      "Poster": "https://..."
    }
  ]
}
```

## Health Check

### GET /api/health
Check API status.

**Response (200):**
```json
{
  "status": "ok",
  "message": "API is running"
}
```

## Error Responses

All endpoints may return error responses:

**400 Bad Request:**
```json
{
  "error": "Error message"
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid email or password."
}
```

**500 Internal Server Error:**
```json
{
  "error": "Server error message"
}
```
