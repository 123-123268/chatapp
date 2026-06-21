# Real-Time Chat Application

A full-stack real-time messaging platform built using React, Node.js, Express, Socket.IO, Zustand, and MongoDB, enabling instant communication between users through WebSocket-based connections.


## Features

- Real-time messaging using Socket.IO and WebSockets
- Instant message synchronization across connected clients
- User authentication and authorization
- Online/offline user presence indicators
- Typing indicators
- Persistent chat history using MongoDB
- Global state management using Zustand
- Responsive and user-friendly interface

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React |
| Backend | Node.js, Express |
| Real-Time Communication | Socket.IO, WebSockets |
| State Management | Zustand |
| Database | MongoDB |
| Development Tools | Nodemon, postman|

---

## Application Screenshots

### Login Page

<p align="center">
  <img src="public/login.png" width="800">
</p>

### Chat Interface

<p align="center">
  <img src="public/chat.png" width="800">
</p>

### User List

<p align="center">
  <img src="public/users.png" width="800">
</p>

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-application.git
cd chat-application
```

### 2. Start the Frontend

Open a terminal and run:

```bash
cd frontend
npm install
npm run dev
```

### 3. Start the Backend

Open another terminal and run:

```bash
cd backend
npm install
nodemon index.js
```

> Make sure MongoDB is running locally or configure the appropriate MongoDB connection string in your environment variables.

---

## Project Structure

```text
chat-application/
├── frontend/
│   ├── src/
│   └── ...
├── backend/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   └── index.js
└── README.md
```

---

## Future Improvements

- Group chat functionality
- Read receipts
- Message reactions
- File and image sharing
- Push notifications
- End-to-end encryption
