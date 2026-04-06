# Gophir 🐬

Gophir is a modern real-time web chat application built with TypeScript, React, and WebSockets. It features a robust authentication system, real-time messaging, and persistent user profiles.

<p align="center">
    <img src="/assets/showcase.gif" alt="Gophir Showcase" />
</p>

---

## 🚀 Features

- **Real-time Messaging**: Instant communication powered by Socket.io.
- **Authentication**: Secure JWT-based authentication with bcrypt password hashing.
- **User Profiles**: Personalized user descriptions and profile management.
- **Notifications**: Real-time and persistent notification system.
- **Responsive UI**: Modern interface built with React and custom CSS.
- **Clean Architecture**: Backend organized into UseCases, Repositories, and Providers.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: React Context API
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Phosphor React](https://phosphoricons.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Communication**: [Socket.io-client](https://socket.io/docs/v4/client-api/), [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Real-time**: [Socket.io](https://socket.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM/Query Builder**: [Knex.js](https://knexjs.org/)
- **Validation**: [Zod](https://zod.dev/)
- **Logging**: [Winston](https://github.com/winstonjs/winston)
- **Auth**: JWT (JSON Web Tokens) & Bcrypt

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v20+)
- Yarn or NPM
- Docker (optional, for database)

### 1. Database Setup
You can use Docker to quickly start a PostgreSQL instance:
```bash
cd server
docker-compose up -d
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Configure environment variables (create `.env` from `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Run migrations:
   ```bash
   yarn migrate
   ```
5. Start the server:
   ```bash
   yarn build
   yarn start
   ```

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Configure environment variables (create `.env` from `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   yarn dev
   ```

---

## 📂 Project Structure

### Backend (`/server`)
- `src/controller`: HTTP request handlers.
- `src/usecase`: Business logic layer.
- `src/repositories`: Data access layer.
- `src/socket`: WebSocket event handlers and configuration.
- `src/factory`: Dependency injection/factory patterns.

### Frontend (`/client`)
- `src/components`: Reusable UI components.
- `src/hooks`: Custom React hooks (Session, Socket, Notifications).
- `src/page`: Application pages and routing logic.
- `src/services`: API and Socket communication services.

---

## 📊 Database Schema

- **Users**: Authentication details (username, hashed password).
- **Messages**: Chat history (content, author, timestamp).
- **Profiles**: User-specific information (descriptions).
- **Notifications**: Persistent user alerts.

---

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
Developed with ❤️ by [tosuki](https://github.com/tosuki)
