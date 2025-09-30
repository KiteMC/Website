
# VerifyMC Web Services

<cite>
**Referenced Files in This Document**   
- [API/index.js](file://API/index.js)
- [pages/docs/verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md)
- [pages/zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md)
- [pages/docs/verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)
- [pages/zh/docs/verifymc/guide/v1.md](file://pages/zh/docs/verifymc/guide/v1.md)
- [pages/verification.html](file://pages/verification.html)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [RESTful Endpoints](#restful-endpoints)
3. [User Registration Flow](#user-registration-flow)
4. [Admin Review Process](#admin-review-process)
5. [Configuration Management](#configuration-management)
6. [Frontend Integration](#frontend-integration)
7. [Security Considerations](#security-considerations)
8. [Testing Guidelines](#testing-guidelines)
9. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
10. [Conclusion](#conclusion)

## Introduction

The VerifyMC Web Services backend component provides a comprehensive RESTful API for managing Minecraft server whitelist registration and administration. This documentation details the implementation of key endpoints that facilitate user registration through email verification, administrative review processes, and configuration management. The system is designed to prevent abuse through rate limiting and email validation while providing administrators with tools to manage player access efficiently.

The backend serves as the bridge between the Minecraft server plugin and the web interface, enabling players to register via a web form and administrators to review applications through a dedicated panel. The API supports multilingual responses and integrates with SMTP services for email verification. While the current implementation in API/index.js focuses on GitHub commit retrieval for SurviveX, the documented endpoints are part of the broader VerifyMC system as described in the documentation files.

**Section sources**
- [API/index.js](file://API/index.js#L1-L91)
- [pages/docs/verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md#L0-L215)
- [pages/zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md#L0-L215)

## RESTful Endpoints

### POST /api/send-code
This endpoint initiates the user registration process by sending a verification code to the specified email address. The service implements rate limiting to prevent abuse, restricting the number of codes that can be sent per email within a given time period. The endpoint validates email format according to RFC standards before processing the request.

**Request Schema**
- Headers: `Content-Type: application/json`
- Body Parameters:
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | email | string | Yes | User's email address |
  | language | string | No | Preferred language (zh/en) |

**Response Format**
- Success: `{ "success": true, "msg": "Verification code sent" }`
- Failure: `{ "success": false, "msg": "Invalid email format or already registered" }`

**Section sources**
- [pages/docs/verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md#L0-L33)
- [pages/zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md#L0-L33)

### POST /api/register
This endpoint processes user registration by validating the email verification code and storing user information. The registration requires a valid code that has not expired (typically within 5 minutes). The system enforces uniqueness constraints on both email addresses and usernames.

**Request Schema**
- Headers: `Content-Type: application/json`
- Body Parameters:
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | email | string | Yes | User's email address |
  | code | string | Yes | Email verification code |
  | uuid | string | Yes | Player's UUID |
  | username | string | Yes | Player's username |
  | language | string | No | Preferred language |

**Response Format**
- Success: `{ "success": true, "msg": "Registration successful" }`
- Failure: `{ "success": false, "msg": "Verification code incorrect or expired" }`

**Section sources**
- [pages/docs/verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md#L35-L68)
- [pages/zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md#L35-L68)

### POST /api/admin-login
This endpoint authenticates administrators and issues JWT tokens for subsequent API access. The authentication is based on a password configured in the plugin settings. Upon successful login, the server returns a JWT token that must be included in the Authorization header for protected endpoints.

**Request Schema**
- Headers: `Content-Type: application/json`
- Body Parameters:
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | password | string | Yes | Admin password |
  | language | string | No | Preferred language |

**Response Format**
- Success: `{ "success": true, "token": "JWT_TOKEN", "message": "Login successful" }`
- Failure: `{ "success": false, "message": "Incorrect password" }`

**Section sources**
- [pages/docs/verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md#L70-L101)
- [pages/zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md#L70-L101)

### POST /api/review
This protected endpoint allows authenticated administrators to approve or reject user registration requests. The operation requires a valid JWT token in the Authorization header. Administrators can provide a reason when rejecting a request.

**Request Schema**
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
- Body Parameters:
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | uuid | string | Yes | Player's UUID |
  | action | string | Yes | Action (approve/reject) |
  | reason | string | No | Rejection reason |
  | language | string | No | Preferred language |

**Response Format**
- Success: `{ "success": true, "msg": "Operation successful" }`
- Failure: `{ "success": false, "msg": "No permission or user not found" }`

**Section sources**
- [pages/docs/verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md#L139-L189)
- [pages/zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md#L139-L189)

### GET /api/pending-list
This endpoint retrieves a list of users awaiting administrative review. Access requires a valid JWT token. The response includes user details such as UUID, username, email, and registration time.

**Request Schema**
- Headers: `Authorization: Bearer <token>`
- Query Parameters:
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | language | string | No | Preferred language |

**Response Format**
- Success: `{ "success": true, "users": [{ "uuid": "...", "username": "...", "email": "...", "status": "pending", "regTime": "..." }] }`
- Failure: `{ "success": false, "msg": "No permission" }`

**Section sources**
- [pages/docs/verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md#L103-L138)
- [pages/zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md#L103-L138)

### GET /api/user-status
This endpoint allows querying the review status of a specific user by their UUID. It is publicly accessible and does not require authentication.

**Request Schema**
- Query Parameters:
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | uuid | string | Yes | Player's UUID |

**Response Format**
- Success: `{ "success": true, "data": { "status": "approved", "reason": "" } }`
- The status can be "approved", "pending", "rejected", or "banned".

**Section sources**
- [pages/docs/verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md#L190-L215)
- [pages/zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md#L190-L215)

### GET /api/config
This endpoint serves configuration data to the frontend, including login settings, admin configurations, and frontend appearance options. The configuration is publicly accessible.

**Response Format**
```json
{
  "login": { "enable_email": true, "email_smtp": "smtp.qq.com" },
  "admin": { ... },
  "frontend": { "theme": "glassx", "logo_url": "/logo.png" }
}
```

**Section sources**
- [pages/docs/verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md#L139-L189)
- [pages/zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md#L139-L189)

## User Registration Flow

The user registration flow begins when a player submits their email address through the verification.html frontend form. The system first validates the email format and checks if it has already been registered. If valid, a six-digit verification code is generated and sent to the email via SMTP service. The code is stored in the system with an expiration time of 5 minutes.

When the user enters the verification code along with their Minecraft username and UUID, the POST /api/register endpoint validates the code against the stored value. The system also checks that the username is unique and matches the configured regex pattern (^[a-zA-Z0-9_-]{3,16}$). If all validations pass, the user