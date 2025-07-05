# ZChat

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

A private, real-time messaging application designed for one-on-one conversations. Access is managed through a unique, key-based system, eliminating the need for traditional user accounts and passwords.

This project is a full-stack MERN application (MongoDB, Express, React, Node.js) built with a modern monorepo structure and deployed as a single, cohesive web service.

**Live Demo:** [**z-chat.onrender.com**](https://your-app-name.onrender.com) _(Replace with your actual Render URL)_

---

## ✨ Features

- **Key-Based Access:** No sign-ups or passwords. Users join conversations using unique keys provided by the admin.
- **Real-Time Messaging:** Instant, bidirectional communication powered by WebSockets (Socket.IO).
- **Persistent Chat History:** All conversations are securely stored in a MongoDB database.
- **Dual User Roles:**
  - **Admin:** A master key provides access to a dashboard listing all conversations.
  - **Friend (Participant):** A unique key grants access to a specific one-on-one chat.
- **Unread Message Notifications:** The admin dashboard displays a notification badge for chats with new messages.
- **Emoji Support:** Integrated emoji picker for expressive messaging.
- **Responsive Design:** A clean, modern UI built with Tailwind CSS that works on both desktop and mobile.

---

## 🛠️ Tech Stack

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **Vite:** A lightning-fast frontend build tool.
- **Socket.IO Client:** The client-side library for WebSocket communication.
- **React Router:** For declarative routing and page management.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **`emoji-picker-react`:** For a seamless emoji integration.

### Backend
- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A minimal and flexible web application framework for Node.js.
- **Socket.IO:** The server-side library for enabling real-time, event-based communication.
- **MongoDB:** A NoSQL database for storing message and conversation data.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **`dotenv`:** For managing environment variables.

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name