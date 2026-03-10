# IBlog 🚀

IBlog is a premium, full-stack blogging platform built with the MERN stack. Designed with a modern, frosted-glass aesthetic and responsive grid layouts, it provides a seamless experience for users to write, publish, edit, and discover stories.

## Table of Contents

* [Features](https://www.google.com/search?q=%23features)
* [Tech Stack](https://www.google.com/search?q=%23tech-stack)
* [Setup & Installation](https://www.google.com/search?q=%23setup--installation)
* [Environment Variables](https://www.google.com/search?q=%23environment-variables)
* [Deployment Architecture](https://www.google.com/search?q=%23deployment-architecture)
* [License](https://www.google.com/search?q=%23license)

---

## Features

### 🎨 Premium User Interface

* **Glassmorphism Design:** Modern, frosted-glass cards, subtle glowing backgrounds, and smooth hover state animations.
* **Fully Responsive:** Beautiful grid layouts that adapt perfectly to mobile, tablet, and desktop screens.
* **Tailwind Typography:** Automatically styled rich-text content for a distraction-free, magazine-like reading experience.

### ✍️ Content Creation & Management

* **Rich Text Editor:** Integrated `ReactQuill` for formatting text, adding links, and structuring articles.
* **Media Uploads:** Progress-tracked image and video uploads for blog covers and inline content.
* **CRUD Operations:** Users can create, read, update, and delete their own posts.
* **Admin Controls:** Elevated privileges for featuring or moderating content.

### ⚡ Advanced Functionality

* **Optimistic UI Updates:** Powered by `@tanstack/react-query` for instant feedback when saving posts, liking, or commenting.
* **Authentication:** Secure user login, registration, and session management powered by **Clerk**.
* **Smart Cold-Start Handling:** Custom `ServerWaker` component to gracefully handle free-tier backend spin-ups with an animated loading UI.

---

## Tech Stack

| Category | Technologies |
| --- | --- |
| **Frontend** | React 19 (Vite), Tailwind CSS, React Router DOM |
| **Data Fetching** | TanStack React Query, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | Clerk Auth |
| **UI Libraries** | React Icons, React Toastify, React Loader Spinner |

---

## Setup & Installation

> **Prerequisites:** You must have Node.js installed and a MongoDB cluster (like Atlas) ready.

**1. Clone the repository**

```bash
git clone https://github.com/Adarsh234/IBlog.git
cd IBlog

```

**2. Install Backend Dependencies**

```bash
cd backend
npm install

```

**3. Install Frontend Dependencies**

```bash
cd ../frontend
npm install --legacy-peer-deps

```

*(Note: `--legacy-peer-deps` is required to resolve strict version checking between React 19 and React Query).*

**4. Run the Development Servers**

Open two separate terminal windows:

**Terminal 1 (Backend):**

```bash
cd backend
npm run dev

```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev

```

---

## Environment Variables

To run this project, you will need to add the following environment variables to your respective `.env` files.

**Backend (`backend/.env`)**

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
CLERK_SECRET_KEY=<your-clerk-secret-key>
# Add any Cloudinary/Firebase keys if used for media uploads

```

**Frontend (`frontend/.env.local`)**

```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>

```

---

## Deployment Architecture

IBlog is configured for modern, split-stack deployment:

* **Frontend:** Hosted on **Vercel**. Includes a custom `vercel.json` file to securely rewrite client-side routing paths and prevent 404 errors on page refreshes.
* **Backend:** Hosted on **Render** (Web Service).
* **Cold Start Mitigation:** Since free-tier backend services sleep after inactivity, the frontend implements a `ServerWaker` component that automatically pings the backend on initial load, displaying a premium loading screen until the server connects.

---

## License & Author

Crafted by **Adarsh Sharma** All rights reserved © 2026.

*(Check out my other full-stack projects like CodeCracker and my AI Health Assistant on my [GitHub Profile](https://github.com/Adarsh234)!)*
