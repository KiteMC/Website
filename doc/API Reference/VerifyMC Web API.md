
# VerifyMC Web API

<cite>
**Referenced Files in This Document**   
- [index.js](file://API/index.js)
- [v1.md](file://pages/docs/verifymc/front/v1.md)
- [guide/v1.md](file://pages/docs/verifymc/guide/v1.md)
- [index.md](file://pages/docs/verifymc/index.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Authentication Mechanism](#authentication-mechanism)
3. [API Endpoints](#api-endpoints)
   - [POST /api/send-code](#post-apisend-code)
   - [POST /api/register](#post-apiregister)
   - [POST /api/admin-login](#post-apiadmin-login)
   - [POST /api/review](#post-apireview)
   - [GET /api/pending-list](#get-apipending-list)
   - [GET /api/user-status](#get-apiuser-status)
   - [GET /api/config](#get-apiconfig)
4. [Data Validation Rules](#data-validation-rules)
5. [Workflow Integration](#workflow-integration)
6. [Security Practices](#security-practices)
7. [Developer Integration Guidance](#developer-integration-guidance)

## Introduction
The VerifyMC Web API provides a comprehensive set of endpoints for managing Minecraft server whitelist registration and administration. This API enables secure user registration through email verification, administrator review processes, and configuration retrieval. The system supports RESTful interactions for both public users and authenticated administrators, facilitating seamless integration with frontend applications and external services.

**Section sources**
- [index.md](file://pages/docs/verifymc/index.md#L2-L32)
- [guide/v1.md](file://pages/docs/verifymc/guide/v1.md#L0-L11)

## Authentication Mechanism
VerifyMC implements JWT-based authentication for administrative endpoints to ensure secure access control. Administrators must first authenticate to obtain a bearer token, which is then included in subsequent requests to protected endpoints.

The authentication process follows these principles:
- **Token Generation**: Upon successful admin login, the server generates a JWT token containing the administrator's credentials and expiration timestamp.
- **Token Expiration**: Tokens have a defined expiration policy to enhance security, requiring administrators to re-authenticate after the validity period ends.
- **Token Transmission**: The JWT token is transmitted in the Authorization header as `Bearer <token>` for all authenticated requests.
- **Access Control**: Only authorized administrators with valid tokens can access protected endpoints such as user review and pending list retrieval.

This mechanism ensures that sensitive administrative functions are protected against unauthorized access while maintaining a stateless authentication model.

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L139-L189)
- [v1.md](file://pages/docs/verifymc/front/v1.md#L103-L138)

## API Endpoints

### POST /api/send-code
Sends a verification code to the specified email address for registration purposes.

**Purpose**: Initiate the registration process by sending a verification code to prevent abuse and verify email ownership.

**HTTP Method**: POST

**URL**: `/api/send-code`

**Request Headers**:
- `Content-Type: application/json`

**Request Body Schema**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| email | string | Yes | User's email address | user@example.com |
| language | string | No | Preferred language (zh/en) | en |

**Request Example**:
```json
{
  "email": "user@example.com",
  "language": "en"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "msg": "Verification code sent"
}
```

**Error Responses**:
- **400 Bad Request**: Invalid email format or already registered
```json
{
  "success": false,
  "msg": "Invalid email format or already registered"
}
```
- **429 Too Many Requests**: Rate limit exceeded for email sending
- **500 Internal Server Error**: Server processing error

**Notes**:
- Email sending is rate-limited to prevent abuse.
- Email format must comply with RFC standards.

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L0-L33)

### POST /api/register
Registers a new user using the verification code sent to their email.

**Purpose**: Complete the registration process by verifying the code and submitting user information.

**HTTP Method**: POST

**URL**: `/api/register`

**Request Headers**:
- `Content-Type: application/json`

**Request Body Schema**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| email | string | Yes | User's email address | user@example.com |
| code | string | Yes | Email verification code | 123456 |
| uuid | string | Yes | Player's UUID | player-uuid |
| username | string | Yes | Player's username | playername |
| language | string | No | Preferred language | en |

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

**Success Response (200)**:
```json
{
  "success": true,
  "msg": "Registration successful"
}
```

**Error Responses**:
- **400 Bad Request**: Verification code incorrect, expired, or invalid data
```json
{
  "success": false,
  "msg": "Verification code incorrect or expired"
}
```
- **409 Conflict**: Username or email already exists
- **500 Internal Server Error**: Server processing error

**Notes**:
- Verification code is valid for 5 minutes.
- Username and email must be unique.
- Registration may require administrator approval based on server configuration.

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L35-L68)

### POST /api/admin-login
Authenticates administrators and returns a JWT token for subsequent requests.

**Purpose**: Allow administrators to authenticate and obtain a token for accessing protected endpoints.

**HTTP Method**: POST

**URL**: `/api/admin-login`

**Request Headers**:
- `Content-Type: application/json`

**Request Body Schema**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| password | string | Yes | Administrator password | admin_password |

**Request Example**:
```json
{
  "password": "admin_password"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:
- **401 Unauthorized**: Invalid credentials
```json
{
  "success": false,
  "msg": "Invalid password"
}
```
- **500 Internal Server Error**: Server processing error

**Notes**:
- The returned JWT token must be included in the Authorization header for all subsequent admin requests.
- Tokens have a limited expiration period for security.

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L139-L189)

### POST /api/review
Allows administrators to review and approve or reject user registration requests.

**Purpose**: Enable administrators to manage pending registration requests.

**HTTP Method**: POST

**URL**: `/api/review`

**Request Headers**:
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body Schema**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| uuid | string | Yes | Player's UUID | player-uuid |
| action | string | Yes | Action to perform (approve/reject) | approve |
| reason | string | No | Reason for rejection (if applicable) | Invalid information |
| language | string | No | Preferred language | en |

**Request Example**:
```json
{
  "uuid": "player-uuid",
  "action": "approve",
  "reason": "",
  "language": "en"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "msg": "Operation successful"
}
```

**Error Responses**:
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: User not found
```json
{
  "success": false,
  "msg": "No permission or user not found"
}
```
- **500 Internal Server Error**: Server processing error

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L139-L189)

### GET /api/pending-list
Retrieves a list of users awaiting administrative review.

**Purpose**: Provide administrators with a list of pending registration requests for review.

**HTTP Method**: GET

**URL**: `/api/pending-list`

**Request Headers**:
- `Authorization: Bearer <token>`

**Query Parameters**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| language | string | No | Preferred language | en |

**Success Response (200)**:
```json
{
  "success": true,
  "users": [
    {
      "uuid": "player-uuid",
      "username": "playername",
      "email": "user@example.com",
      "status": "pending",
      "regTime": "2023-12-01T10:30:00Z"
    }
  ]
}
```

**Error Responses**:
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
```json
{
  "success": false,
  "msg": "No permission"
}
```
- **500 Internal Server Error**: Server processing error

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L103-L138)

### GET /api/user-status
Queries the review status of a specific user.

**Purpose**: Allow users or administrators to check the current status of a registration request.

**HTTP Method**: GET

**URL**: `/api/user-status`

**Query Parameters**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| uuid | string | Yes | Player's UUID | player-uuid |

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "status": "approved",
    "reason": ""
  }
}
```

**Error Responses**:
- **400 Bad Request**: Missing UUID parameter
- **404 Not Found**: User not found
- **500 Internal Server Error**: Server processing error

**User Status Values**:
- `approved`: Registration approved
- `pending`: Awaiting review
- `rejected`: Registration rejected
- `banned`: User banned

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L190-L215)

### GET /api/config
Retrieves frontend, login, and other configuration information.

**Purpose**: Provide clients with necessary configuration details for proper UI rendering and functionality.

**HTTP Method**: GET

**URL**: `/api/config`

**Success Response (200)**:
```json
{
  "login": {
    "enable_email": true,
    "email_smtp": "smtp.qq.com"
  },
  "admin": {
    "require_password": true
  },
  "frontend": {
    "theme": "glassx",
    "logo_url": "/logo.png",
    "announcement": "Welcome to [ Name ]!"
  }
}
```

**Error Responses**:
- **500 Internal Server Error**: Server processing error

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L139-L189)

## Data Validation Rules
VerifyMC enforces strict data validation rules to ensure data integrity and security:

**Email Validation**:
- Must comply with RFC email format standards
- Subject to domain whitelist restrictions (default: gmail.com, 163.com, 126.com, qq.com, outlook.com, hotmail.com, icloud.com, yahoo.com, foxmail.com)
- Option to disable email aliases (e.g., user+tag@gmail.com)

**Code Validation**:
- Verification codes are typically 6 digits
- Codes expire after 5 minutes
- Rate limiting applied to prevent brute force attacks

**Username Validation**:
- Must match the regular expression `^[a-zA-Z0-9_-]{3,16}$`
- Case sensitivity configurable via `username_case_sensitive` setting
- Must be unique across the system

**User Status Constraints**:
- Valid status values: approved, pending, rejected, banned
- Status transitions follow a specific workflow: pending → approved/rejected
- Banned users cannot re-register without administrative intervention

**Section sources**
- [guide/v1.md](file://pages/docs/verifymc/guide/v1.md#L63-L208)

## Workflow Integration
The VerifyMC API endpoints are designed to work together in a specific sequence to provide a seamless registration and review experience:

1. **Registration Initiation**: User starts by calling `POST /api/send-code` with their email address
2. **Code Verification**: After receiving the code, user calls `POST /api/register` with the code and their information
3. **Administrator Authentication**: Admin logs in using `POST /api/admin-login` to obtain a JWT token
4. **Pending List Retrieval**: Admin retrieves pending registrations using `GET /api/pending-list`
5. **User Review**: Admin reviews and approves/rejects users via `POST /api/review`
6. **Status Checking**: Users can check their status using `GET /api/user-status`

This workflow ensures a secure and controlled registration process while providing administrators with the necessary tools to manage user access effectively.

**Section sources**
- [v1.md](file://pages/docs/verifymc/front/v1.md#L0-L68)
- [v1.md](file://pages/docs/verifymc/front/v1.md#L103-L18