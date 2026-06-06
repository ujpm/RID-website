# Research and Innovation for Development (RID)
Empowering Rwandan youth to lead through research and innovation.

## 🌍 About The Project

The official website for the Research and Innovation for Development (RID) Association. RID is a youth-led movement dedicated to transforming peers into leaders and problem-solvers. We instill a research spirit, run masterclasses, provide mentorship, and empower youth to build incredible things that drive social inclusion and development.

## 💻 Tech Stack

This project uses a Full-Stack TypeScript architecture to securely handle data and ensure robust code:

* **Frontend:** React, Vite, TypeScript (.tsx), CSS Modules.

* **Backend:** Node.js, Express, TypeScript, MongoDB Atlas (Mongoose).

## 📂 Project Structure

The repository is split into two isolated environments to enforce modularity and security:

* `/frontend` - The client-side user interface.

* `/backend` - The server-side API handling database connections.

## 🚀 Getting Started

To run this project locally in your environment (like GitHub Codespaces), you must run both the frontend and backend servers simultaneously.
### 1. Backend Setup

Open your terminal and run:

```bash
cd backend

npm install
# Note: You will need to create a .env file here for MongoDB credentials.

npm run start:dev  # (Script to be configured in development)

2. Frontend Setup

Open a second terminal window and run:

```Bash
cd frontend

npm install

npm run dev 
```
# 🔐 Environment Variables

A .env file is required in the /backend directory to connect to MongoDB Atlas securely. This file should never be committed to version control.