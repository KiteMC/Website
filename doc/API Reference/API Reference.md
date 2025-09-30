# API Reference

<cite>
**Referenced Files in This Document**   
- [index.js](file://API/index.js)
- [v1.md](file://pages/docs/verifymc/front/v1.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [GitHub Integration Endpoints](#github-integration-endpoints)
3. [VerifyMC Web Services](#verifymc-web-services)
4. [Authentication Mechanisms](#authentication-mechanisms)
5. [Rate Limiting and Security](#rate-limiting-and-security)
6. [Error Handling](#error-handling)
7. [Client Implementation Guidelines](#client-implementation-guidelines)
8. [API Stability and Backward Compatibility](#api-stability-and-backward-compatibility)

## Introduction
This document provides comprehensive API documentation for the public endpoints exposed by the KiteMC website repository. The APIs are divided into two main categories: GitHub integration endpoints that retrieve repository data from GitHub, and VerifyMC web services that handle user registration, verification, and administrative functions. All endpoints follow RESTful principles and use JSON for request and response payloads.

**Section sources**
- [index.js](file://API/index.js#L1-L91)
- [v1.md](file://pages/docs/verifymc/front/v1.md#L0-L215)

## GitHub Integration Endpoints

### GET /api/commits
Retrieves all commits from a specified GitHub repository branch.

**Purpose**: Fetch commit history for a repository branch, with special handling for VerifyMC to include release tags.

**HTTP Method**: GET

**URL Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| owner | string | No | KiteMC | Repository owner |
| repo | string | No | SurviveX | Repository name |
| branch | string | No | ver/1.21.4 | Branch name |

**Response Schema**:
```json
[
  {
    "number": "string",
    "hash": "string",
    "message": "string",
    "author": "string",
    "date": "string",
    "version": "string"
  }
]
```

**Success Response** (200 OK):
```json
[
  {
    "number": "#1",
    "hash": "a1b2c3d4e5f6...",
    "message": "Fix bug in authentication",
    "author": "John Doe",
    "date": "2023-06-15T10:30:00Z",
    "version": "ver/1.21.4"
  }
]
```

**Error Response** (500 Internal Server Error):
```json
{
  "error": "Error message describing the failure"
}
```

**Notes**:
- The endpoint automatically paginates through all commits (100 per page).
- For VerifyMC repository, the version field contains the latest release tag instead of branch name.
- Requires GITHUB_TOKEN environment variable for higher rate limits.

**Section sources**
- [index.js](file://API/index.js#L14-L68)

### GET /api/branches
Retrieves the list of branches from a specified GitHub repository.

**Purpose**: Get all branches in a repository.

**HTTP Method**: GET

**URL Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| owner | string | No | KiteMC | Repository owner |
| repo | string | No | SurviveX | Repository name |

**Response Schema**:
```json
[
  {
    "name": "string",
    "commit": {
      "sha": "string",
      "url": "string"
    },
    "protected": "boolean"
  }
]
```

**Success Response** (200 OK):
```json
[
  {
    "name": "main",
    "commit": {
      "sha": "a1b2c3d4e5f6...",
      "url": "https://api.github.com/repos/KiteMC/SurviveX/commits/a1b2c3d4e5f6..."
    },
    "protected": true
  }
]
```

**Error Response** (500 Internal Server Error):
```json
{
  "error": "Error message describing the failure"
}
```

**Section sources**
- [index.js](file://API/index.js#L71-L91)

## VerifyMC Web Services

### POST /api/send-code
Sends a registration verification code to the specified email address.

**Purpose**: Prevent abuse by requiring email verification during registration.

**HTTP Method**: POST

**Request Headers**:
- Content-Type: application/json

**Request Body**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| email | string | Yes | User email | user@example.com |
| language | string | No | Language (zh/en) | en |

**Request Example**:
```json
{
  "email": "user@example.com",
  "language": "en"
}
```

**Response Schema**:
| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| msg | string | Message |

**Success Response** (200 OK):
```json
{
  "success": true,
  "msg": "Verification code sent"
}
```

**Failure Response** (200 OK):
```json
{
  "success": false,
  "msg": "Invalid email format or already registered"
}
```

**Notes**:
- Email sending is rate-limited per day/minute to prevent abuse.
- Email format must comply with RFC standards.

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L7-L33)

### POST /api/register
Registers a new user with email verification code.

**Purpose**: Complete user registration after email verification.

**HTTP Method**: POST

**Request Headers**:
- Content-Type: application/json

**Request Body**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| email | string | Yes | User email | user@example.com |
| code | string | Yes | Email verification code | 123456 |
| uuid | string | Yes | Player UUID | player-uuid |
| username | string | Yes | Player name | playername |
| language | string | No | Language | en |

**Request Example**:
```json
{
  "email": "user@example.com",
  "code": "123456",
  "uuid": "player-uuid",
  "username": "playername",
  "language": "en"
}
```

**Response Schema**:
| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| msg | string | Message |

**Success Response** (200 OK):
```json
{
  "success": true,
  "msg": "Registration successful"
}
```

**Failure Response** (200 OK):
```json
{
  "success": false,
  "msg": "Verification code incorrect or expired"
}
```

**Notes**:
- Verification code is valid for 5 minutes.
- Username and email must be unique.
- Registration may require admin approval.

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L35-L68)

### POST /api/admin-login
Authenticates an administrator and returns a JWT token.

**Purpose**: Admin login to access protected endpoints.

**HTTP Method**: POST

**Request Headers**:
- Content-Type: application/json

**Request Body**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| password | string | Yes | Admin password | your_admin_password |
| language | string | No | Language | en |

**Request Example**:
```json
{
  "password": "your_admin_password",
  "language": "en"
}
```

**Response Schema**:
| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| token | string | JWT token |
| message | string | Message |

**Success Response** (200 OK):
```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "message": "Login successful"
}
```

**Failure Response** (200 OK):
```json
{
  "success": false,
  "message": "Incorrect password"
}
```

**Notes**:
- All subsequent admin APIs require Authorization: Bearer <token> header.

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L70-L101)

### GET /api/pending-list
Retrieves the list of users pending admin review.

**Purpose**: Get all users awaiting approval.

**HTTP Method**: GET

**Authentication**: Required (JWT token)

**Request Headers**:
- Authorization: Bearer <token>

**URL Parameters**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| language | string | No | Language | en |

**Response Schema**:
| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| users | array | Array of user objects |

**User Object Structure**:
| Field | Type | Description |
|-------|------|-------------|
| uuid | string | Player UUID |
| username | string | Player name |
| email | string | Email |
| status | string | Status (pending) |
| regTime | string | Registration time |

**Success Response** (200 OK):
```json
{
  "success": true,
  "users": [
    {
      "uuid": "...",
      "username": "...",
      "email": "...",
      "status": "pending",
      "regTime": "..."
    }
  ]
}
```

**Failure Response** (200 OK):
```json
{
  "success": false,
  "msg": "No permission"
}
```

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L103-L138)

### POST /api/review
Reviews and approves or rejects a pending user.

**Purpose**: Admin reviews user registration.

**HTTP Method**: POST

**Authentication**: Required (JWT token)

**Request Headers**:
- Authorization: Bearer <token>
- Content-Type: application/json

**Request Body**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| uuid | string | Yes | Player UUID | player-uuid |
| action | string | Yes | Action (approve/reject) | approve |
| reason | string | No | Reason (if rejected) | Incomplete information |
| language | string | No | Language | en |

**Request Example**:
```json
{
  "uuid": "player-uuid",
  "action": "approve",
  "reason": "",
  "language": "en"
}
```

**Response Schema**:
| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| msg | string | Message |

**Success Response** (200 OK):
```json
{
  "success": true,
  "msg": "Operation successful"
}
```

**Failure Response** (200 OK):
```json
{
  "success": false,
  "msg": "No permission or user not found"
}
```

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L139-L189)

### GET /api/user-status
Queries the review status of a specific user.

**Purpose**: Check the current status of a user's registration.

**HTTP Method**: GET

**Authentication**: Not required

**URL Parameters**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| uuid | string | Yes | Player UUID | player-uuid |

**Response Schema**:
| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| data | object | User status data |

**Data Object Structure**:
| Field | Type | Description |
|-------|------|-------------|
| status | string | User status (approved/pending/rejected/banned) |
| reason | string | Reason for rejection/ban (if any) |

**Success Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "status": "approved",
    "reason": ""
  }
}
```

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L190-L215)

### GET /api/config
Retrieves frontend and system configuration.

**Purpose**: Get configuration for frontend display and behavior.

**HTTP Method**: GET

**Authentication**: Not required

**Response Schema**:
| Field | Type | Description |
|-------|------|-------------|
| login | object | Login configuration |
| admin | object | Admin configuration |
| frontend | object | Frontend configuration |

**Success Response** (200 OK):
```json
{
  "login": {
    "enable_email": true,
    "email_smtp": "smtp.qq.com"
  },
  "admin": { ... },
  "frontend": {
    "theme": "glassx",
    "logo_url": "/logo.png"
  }
}
```

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L139-L189)

## Authentication Mechanisms
The API uses JWT (JSON Web Tokens) for administrative authentication. Regular user endpoints are public, while admin endpoints require authentication.

**Admin Authentication Flow**:
1. Admin sends POST request to /api/admin-login with password
2. Server validates credentials and returns JWT token
3. Admin includes token in Authorization header for subsequent requests: `Authorization: Bearer <token>`
4. Server validates token for each protected endpoint

**Token Expiration**: The documentation does not specify token expiration time, but best practices suggest tokens should have a limited lifespan (e.g., 24 hours) for security.

**Security Considerations**:
- JWT tokens should be stored securely on the client side
- Use HTTPS in production to prevent token interception
- Implement token refresh mechanisms for long-running admin sessions

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L70-L101)

## Rate Limiting and Security
The API implements several security measures to protect against abuse and common web vulnerabilities.

**Rate Limiting**:
- Email verification code sending is rate-limited per day and per minute
- Prevents abuse of the registration system
- Specific limits are not documented but follow standard practices

**Input Validation**:
- Email format validation using RFC standards
- Required fields validation for all POST requests
- UUID format validation for player identifiers

**Security Protections**:
- CORS (Cross-Origin Resource Sharing) enabled with appropriate policies
- Environment variables for sensitive data (GITHUB_TOKEN)
- Password protection for admin endpoints
- Verification codes with limited validity period (5 minutes)

**Best Practices for Clients**:
- Implement client-side input validation as first line of defense
- Handle rate limiting responses gracefully
- Never expose admin credentials or tokens in client-side code
- Use secure storage for any tokens or sensitive data

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L7-L33)
- [v1.md](file://pages/docs/verifymc/front/v1.md#L35-L68)

## Error Handling
The API uses consistent error handling patterns across all endpoints.

**Error Response Structure**:
All error responses follow the same basic structure as success responses, with success: false and an appropriate message.

```json
{
  "success": false,
  "msg": "Descriptive error message"
}
```

**HTTP Status Codes**:
- 200 OK: Success responses for all endpoints
- 500 Internal Server Error: Server-side errors (GitHub API failures, etc.)

**Common Error Scenarios**:
- Invalid email format or already registered (send-code endpoint)
- Verification code incorrect or expired (register endpoint)
- Incorrect password (admin-login endpoint)
- No permission (admin endpoints without valid token)
- User not found (review endpoint)

**Error Message Localization**:
Error messages support multiple languages through the language parameter in requests.

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L7-L215)

## Client Implementation Guidelines
This section provides recommendations for integrating with the API endpoints.

**General Guidelines**:
- Always use HTTPS in production environments
- Implement proper error handling and user feedback
- Validate inputs on the client side before sending requests
- Handle rate limiting by informing users appropriately

**Registration Flow Implementation**:
1. Collect user email and send to /api/send-code
2. Display success/failure message based on response
3. Collect verification code, UUID, username, and other details
4. Send to /api/register with the verification code
5. Handle success (registration complete) or failure (show error)

**Admin Interface Implementation**:
1. Create login form for /api/admin-login
2. Store JWT token securely upon successful login
3. Include token in Authorization header for all admin endpoints
4. Implement logout functionality that clears the stored token
5. Handle "No permission" responses by redirecting to login

**Configuration Usage**:
- Call /api/config on application startup
- Use returned configuration to customize UI (theme, logo, etc.)
- Check login configuration to determine available authentication methods

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L7-L215)

## API Stability and Backward Compatibility
The API design considers stability and backward compatibility for client applications.

**Versioning**:
- The current API does not implement explicit versioning in URLs
- Changes are communicated through documentation updates
- Breaking changes are avoided when possible

**Backward Compatibility**:
- Field additions are safe and do not break existing clients
- Response structure changes are minimized
- Deprecation process: old endpoints maintained while new ones introduced
- Clear documentation of changes between versions

**Change Management**:
- Monitor the documentation for updates
- Test integrations after API updates
- Report any compatibility issues to the development team
- Plan for periodic updates to client implementations

**Future Considerations**:
- Implement proper API versioning (e.g., /api/v1/endpoint)
- Add comprehensive error codes beyond descriptive messages
- Consider rate limit headers to inform clients of remaining limits
- Implement more granular permission levels for admin functions

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L7-L215)
- [index.js](file://API/index.js#L1-L91)