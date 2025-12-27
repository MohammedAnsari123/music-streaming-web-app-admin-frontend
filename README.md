# StreamLite - Admin Dashboard Portal

The **StreamLite Admin Portal** is a secure, standalone operational console designed for platform administrators. It is completely decoupled from the User Frontend to ensure security and logical separation of concerns. It provides a comprehensive interface for managing the content library, users, and analyzing platform performance.

---

## 📚 Table of Contents
- [Overview](#overview)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [📂 Project Structure](#-project-structure)
- [🛡️ Security Architecture](#️-security-architecture)
- [⚙️ Setup & Installation](#️-setup--installation)

---

## Overview
Built with **React** and **Vite**, the Admin Portal offers a dashboard experience similar to a CMS (Content Management System). It allows admins to populate the app with content (Songs/Podcasts) that is then served to the users. It connects to the same backend API as the user app but uses distinct endpoints protected by Admin-scope middleware.

---

## ✨ Key Features

### 📊 Dashboard Analytics
*   **Real-time Stats:** Visual cards displaying Total Songs, Total Podcasts, Active Artists, and Categories.
*   **Library Overview:** Tabulated views of the current content inventory with quick actions (Delete/Edit).

### 📤 Content Management System (CMS)
*   **Track Upload:** Drag-and-drop interface to upload Audio Files (`.mp3`) and Cover Art (`.jpg`).
    *   Metadata input: Title, Artist, Album, Genre/Category.
    *   Progress indication during upload (`Uploading...` states).
*   **Podcast Management:**
    *   **Create Series:** Define new podcasts with Publishers and Descriptions.
    *   **Publish Episodes:** Upload individual episodes linked to a parent Podcast.

### 👥 User Administration
*   **User List:** View registered users (Name, Email, Join Date).
*   **Moderation:** Capability to view user details (expandable to banning/removing users if API supports).

### 🔔 User Feedback
*   **Toast Notifications:** Instant visual feedback (Success/Error) using `react-toastify` for all actions (Upload success, Login failure, etc.).

---

## 🛠️ Technology Stack

### Core Frameworks
*   **[React 18+](https://react.dev/):** Component-based UI library.
*   **[Vite](https://vitejs.dev/):** Fast build tool and dev server.

### Styling
*   **[Tailwind CSS](https://tailwindcss.com/) (v4 via PostCSS):** Rapid styling.
*   **[Lucide React](https://lucide.dev/):** Professional SVG icons for the dashboard interface.
*   **CSS Animations:** Smooth fade-ins and transitions (`index.css`).

### State & Routing
*   **Context API:**
    *   `AuthContext`: Handles Admin Login state and JWT storage in `localStorage`.
*   **[React Router DOM](https://reactrouter.com/):** Handles navigation (`/admin/dashboard`, `/admin/upload`).
    *   **Protected Routes:** Higher-Order Components ensuring unauthenticated users cannot access dashboard pages.

---

## 📂 Project Structure

```text
admin/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Persistent navigation rail
│   │   ├── AnimatedBackground # Login screen aesthetics
│   │   └── ...
│   │
│   ├── context/
│   │   ├── AuthContext.jsx    # Admin Session Logic
│   │   ├── PrivateRoutes.jsx  # Security Wrapper
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── adminLogin.jsx     # Secure Entry Point
│   │   ├── adminDashboard.jsx # Main Stats & Tables
│   │   ├── UploadTrack.jsx    # Music Upload Form
│   │   ├── UploadPodcast.jsx  # Podcast Creation Form
│   │   ├── UploadEpisode.jsx  # Episode Upload Form
│   │   ├── AdminUsers.jsx     # User Management
│   │   └── AdminLibrary.jsx   # Media List View
│   │
│   ├── App.jsx                # Route Config
│   ├── main.jsx               # Entry Point & ToastProvider
│   └── index.css              # Global Styles
│
├── package.json               # Dependencies
├── postcss.config.js          # Tailwind/PostCSS Setup
└── tailwind.config.js         # Theme Config
```

---

## 🛡️ Security Architecture

The Admin Portal uses a **JWT-based** security model:
1.  **Login:** Admin submits credentials to `/api/admin/login`.
2.  **Token Storage:** On success, a `token` is stored in the browser's `localStorage`.
3.  **Protected Routes:** Attempts to access `/admin/*` routes check for this token via `PrivateRoutes.jsx`. If missing, the user is forced to `/admin/login`.
4.  **API Requests:** Every request to the backend includes the `Authorization: Bearer <token>` header to validate privileges server-side.

---

## ⚙️ Setup & Installation

### Prerequisites
*   Node.js & NPM
*   Running Backend (on port 3000)

### Installation

1.  **Navigate to directory:**
    ```bash
    cd admin
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *Note: If you encounter PostCSS errors, ensure `@tailwindcss/postcss` is installed.*

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The admin portal usually runs on **port 5174** (to avoid conflict with the User App on 5173).

4.  **Access:**
    Open `http://localhost:5174` in your browser.
