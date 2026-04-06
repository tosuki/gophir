# Gophir Client 🖥️

This is the React-based frontend for the Gophir webchat application. It provides a real-time messaging interface, user profile management, and a notification system.

---

## 🚀 Features

- **Responsive Design**: Modern and clean UI.
- **Real-time Messaging**: Instant updates via Socket.io.
- **Authentication**: Secure login/registration with JWT storage.
- **Profile View**: View and edit user profiles.
- **Notification System**: Toast notifications for real-time events.

---

## 🛠️ Tech Stack

- **React**: Modern component-based library.
- **Vite**: Ultra-fast build tool for React.
- **TypeScript**: Static typing for more reliable code.
- **React Router**: For client-side routing.
- **Socket.io Client**: For real-time communication.
- **Phosphor React**: For beautiful icons.
- **Custom CSS**: For efficient and modular styling.

---

## 🏗️ Getting Started

### 1. Install Dependencies
```bash
yarn install
```

### 2. Configure Environment Variables
Create a `.env` file from the example:
```bash
cp .env.example .env
```
Update `VITE_SERVER_BASE_URL` and `VITE_CHAT_SOCKET_URL` to point to your backend service (default: `http://localhost:3000`).

### 3. Start the Development Server
```bash
yarn dev
```

---

## 📂 Project Structure

- `src/components`: UI elements (chat, header, inputs, modals).
- `src/hooks`: Custom React hooks for session, sockets, and state management.
- `src/page`: High-level page components (Home, Auth, Profile).
- `src/services`: API and Socket.io clients.
- `src/router`: Routing configuration.

---

## 🛠️ Development Scripts

- `yarn dev`: Starts the Vite development server.
- `yarn build`: Builds the app for production.
- `yarn lint`: Runs ESLint for code quality checks.
- `yarn preview`: Previews the production build locally.

---
© 2025 Gophir Team
