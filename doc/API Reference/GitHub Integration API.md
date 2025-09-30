# GitHub Integration API

<cite>
**Referenced Files in This Document**   
- [index.js](file://API/index.js)
- [package.json](file://API/package.json)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [API Endpoints](#api-endpoints)
3. [Backend Implementation](#backend-implementation)
4. [Response Structure](#response-structure)
5. [Error Handling](#error-handling)
6. [Environment Configuration](#environment-configuration)
7. [Client Implementation Examples](#client-implementation-examples)
8. [Security and Rate Limiting](#security-and-rate-limiting)
9. [Performance Considerations](#performance-considerations)

## Introduction
The GitHub Integration API provides endpoints to retrieve repository data from GitHub, specifically commit history and branch information. This service acts as a middleware layer between frontend applications and the GitHub API, abstracting authentication and pagination logic while providing structured responses. The backend is built using Express.js and Axios to communicate with GitHub's REST API.

**Section sources**
- [index.js](file://API/index.js#L1-L15)

## API Endpoints

### GET /api/commits
Retrieves all commits from a specified repository branch.

**Request Parameters**
| Parameter | Type   | Required | Default       | Description |
|---------|--------|----------|---------------|-------------|
| owner   | string | No       | KiteMC        | GitHub repository owner |
| repo    | string | No       | SurviveX      | Repository name |
| branch  | string | No       | ver/1.21.4    | Branch name or tag |

**Example Request**
```
GET /api/commits?owner=KiteMC&repo=SurviveX&branch=ver/1.21.4
```

### GET /api/branches
Retrieves all branches from a specified repository.

**Request Parameters**
| Parameter | Type   | Required | Default       | Description |
|---------|--------|----------|---------------|-------------|
| owner   | string | No       | KiteMC        | GitHub repository owner |
| repo    | string | No       | SurviveX      | Repository name |

**Example Request**
```
GET /api/branches?owner=KiteMC&repo=SurviveX
```

**Section sources**
- [index.js](file://API/index.js#L17-L91)

## Backend Implementation
The backend uses Axios to make authenticated requests to the GitHub API. It implements pagination handling for the commits endpoint to retrieve all available commits, as GitHub limits responses to 100 items per page.

For the VerifyMC repository, the service has special logic to retrieve the latest release tag from GitHub's releases API and include it in the commit data as the version identifier instead of the branch name.

The service includes CORS support to allow cross-origin requests from frontend applications.

```mermaid
sequenceDiagram
participant Frontend
participant Backend
participant GitHubAPI
Frontend->>Backend : GET /api/commits
Backend->>GitHubAPI : GET /repos/{owner}/{repo}/commits
GitHubAPI-->>Backend : Commit data (page 1)
Backend->>GitHubAPI : GET /repos/{owner}/{repo}/commits?page=2
GitHubAPI-->>Backend : Commit data (page 2)
alt repo is VerifyMC
Backend->>GitHubAPI : GET /repos/{owner}/{repo}/releases
GitHubAPI-->>Backend : Latest release tag
end
Backend-->>Frontend : Processed commit list
```

**Diagram sources**
- [index.js](file://API/index.js#L17-L68)

```mermaid
sequenceDiagram
participant Frontend
participant Backend
participant GitHubAPI
Frontend->>Backend : GET /api/branches
Backend->>GitHubAPI : GET /repos/{owner}/{repo}/branches
GitHubAPI-->>Backend : Branch list
Backend-->>Frontend : Branch data
```

**Diagram sources**
- [index.js](file://API/index.js#L70-L91)

**Section sources**
- [index.js](file://API/index.js#L17-L91)

## Response Structure

### Commits Response
Returns an array of processed commit objects with simplified structure:

```json
[
  {
    "number": "#1",
    "hash": "a1b2c3d4e5f6...",
    "message": "Fix bug in authentication",
    "author": "John Doe",
    "date": "2023-01-15T10:30:00Z",
    "version": "ver/1.21.4"
  }
]
```

The commits are ordered with the most recent first, numbered sequentially from #1. For VerifyMC repository, the version field contains the latest release tag instead of the branch name.

### Branches Response
Returns raw GitHub API response containing branch objects:

```json
[
  {
    "name": "main",
    "commit": {
      "sha": "a1b2c3d4e5f6...",
      "url": "https://api.github.com/repos/KiteMC/SurviveX/commits/a1b2c3d4e5f6"
    },
    "protected": false
  }
]
```

**Section sources**
- [index.js](file://API/index.js#L55-L68)
- [index.js](file://API/index.js#L85-L91)

## Error Handling
The API implements centralized error handling for both endpoints. Any errors during GitHub API communication result in a 500 Internal Server Error response with a JSON payload containing the error message.

Common error scenarios include:
- Network connectivity issues with GitHub API
- Invalid repository configurations
- GitHub API rate limiting
- Authentication failures

The error response format is:
```json
{ "error": "Error message" }
```

The service does not expose sensitive information in error messages and uses generic error handling to prevent information leakage.

**Section sources**
- [index.js](file://API/index.js#L66-L68)
- [index.js](file://API/index.js#L89-L91)

## Environment Configuration
The service uses environment variables for configuration, primarily for GitHub API authentication.

**GITHUB_TOKEN**
- Purpose: Authenticates requests to GitHub API
- Usage: Included in Authorization header for all GitHub API requests
- Development value: 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 (from package.json dev script)
- Production: Must be set in deployment environment

The token allows higher rate limits and access to private repositories if needed. When no token is provided, the service operates with unauthenticated GitHub API limits.

**Section sources**
- [index.js](file://API/index.js#L4)
- [index.js](file://API/index.js#L11)
- [package.json](file://API/package.json#L7)

## Client Implementation Examples

### Using Fetch API
```javascript
async function getCommits() {
  const response = await fetch('/api/commits?owner=KiteMC&repo=SurviveX');
  if (!response.ok) {
    throw new Error('Failed to fetch commits');
  }
  return response.json();
}

// Usage
getCommits()
  .then(commits => console.log(commits))
  .catch(error => console.error('Error:', error));
```

### Using Axios
```javascript
const axios = require('axios');

async function getBranches() {
  try {
    const response = await axios.get('/api/branches', {
      params: {
        owner: 'KiteMC',
        repo: 'SurviveX'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching branches:', error.message);
    throw error;
  }
}
```

**Section sources**
- [index.js](file://API/index.js#L17-L91)

## Security and Rate Limiting
The integration addresses several security and rate limiting considerations:

**GitHub Rate Limiting**
- Unauthenticated requests: 60 requests per hour per IP
- Authenticated requests: 5,000 requests per hour per user
- The GITHUB_TOKEN environment variable enables authenticated requests with higher limits

**Security Measures**
- The service acts as a proxy, preventing exposure of GitHub credentials to frontend applications
- Error messages are sanitized to avoid information leakage
- CORS is enabled to support legitimate cross-origin requests
- No sensitive data from GitHub responses is modified or exposed beyond what's necessary

**Best Practices**
- Use the GITHUB_TOKEN in production to avoid rate limiting issues
- Implement client-side caching to reduce request frequency
- Handle 500 errors gracefully in client applications
- Monitor API usage to stay within GitHub's rate limits

**Section sources**
- [index.js](file://API/index.js#L28)
- [index.js](file://API/index.js#L44-L45)
- [index.js](file://API/index.js#L79-L80)

## Performance Considerations
The API implementation includes several performance optimizations and considerations:

**Pagination Handling**
The /api/commits endpoint automatically handles pagination, retrieving all commits across multiple pages. This ensures complete data retrieval but may impact response time for repositories with extensive commit history.

**Caching Strategy**
The current implementation does not include built-in caching. Frequent requests to the same endpoints will result in repeated calls to the GitHub API. Consider implementing:

- Server-side caching (e.g., Redis) to store recent responses
- Client-side caching with appropriate TTL based on update frequency
- Conditional requests using ETag headers when supported by GitHub

**Performance Implications**
- Requests without GITHUB_TOKEN may be rate-limited by GitHub
- Large repositories with extensive commit history will have longer response times due to pagination
- Concurrent requests may be subject to GitHub's abuse detection mechanisms

For optimal performance, use authenticated requests and implement caching at either the client or server level based on access patterns.

**Section sources**
- [index.js](file://API/index.js#L36-L54)
- [index.js](file://API/index.js#L70-L76)