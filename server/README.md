# Gophir API ⚙️

This is the backend service for the Gophir webchat. It provides HTTP endpoints for authentication and user management, along with real-time communication via WebSockets.

---

## 🔑 Authentication

Gophir uses JWT (JSON Web Tokens) for secure session management.

### `POST /api/auth/register`
Creates a new user account.
- **Request Body**:
  ```json
  {
      "username": "johndoe",
      "password": "securepassword"
  }
  ```
- **Response** (201 Created):
  ```json
  {
      "code": "created",
      "passport": "JWT_TOKEN"
  }
  ```

### `POST /api/auth/authenticate`
Logs in an existing user.
- **Request Body**:
  ```json
  {
      "username": "johndoe",
      "password": "securepassword"
  }
  ```
- **Response** (200 OK):
  ```json
  {
      "code": "accepted",
      "passport": "JWT_TOKEN"
  }
  ```

### `GET /api/session/check`
Validates the current session token.
- **Header**: `Authorization: Bearer <TOKEN>`
- **Response** (200 OK): Returns user session data.

---

## 👤 Profile Management

### `GET /api/profile/:username`
Retrieves a user's profile information.

### `POST /api/profile/create`
Initializes a profile for a new user.

### `POST /api/profile/edit`
Updates user profile details (e.g., description).

---

## 🔔 Notifications

### `GET /api/notifications/all`
Fetches all persistent notifications for the authenticated user.

### `POST /api/notifications/notify`
Triggers a notification (internal use).

---

## 💬 Real-time Communication (WebSockets)

WebSocket communication is handled via [Socket.io](https://socket.io/).

- **Connection**: Requires a valid JWT token passed during the handshake.
- **Events**:
  - `connected`: Emitted by server upon successful connection, sends recent message history.
  - `message:receive`: Client emits this to send a message.
  - `notification`: Server emits this to send real-time alerts.

---

## 🛠️ Development

### Scripts
- `yarn build`: Compiles TypeScript to JavaScript.
- `yarn start`: Runs the compiled server.
- `yarn migrate`: Runs database migrations using Knex.
- `yarn lint`: Runs ESLint for code quality.

---
© 2025 Gophir Team
