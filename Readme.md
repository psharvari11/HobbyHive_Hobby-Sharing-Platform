# 🎨 HobbyHive — Hobby Sharing Platform Backend

Welcome to **HobbyHive** — your vibrant playground where hobby lovers connect, share, and grow. This is the **backend** code powering the magic: user auth, hobby management, groups, events, resources, and more!

---

## 🚀 Project Overview

HobbyHive is a community-driven platform to discover hobbies, create groups, plan events, share resources, and even exchange skills.  
This backend is built with **Node.js**, **Express**, and **MongoDB**, featuring:

- JWT-based **Strong Authentication** with token blacklisting  
- User profiles with bio, hobbies, and profile pic  
- Hobby CRUD APIs  
- Group & event management  
- Resource sharing with rating & comments  
- Middleware for route protection  

---

## 🗂 Folder Structure

/backend
│
├── controllers/ # Route logic separated by feature


## ⚙️ Installation & Setup

1. **Clone the repo**

git clone https://github.com/psharvari11/HobbyHive_Hobby-Sharing-Platform.git

## Backend Setup:
cd HobbyHive_Hobby-Sharing-Platform/backend
Install dependencies
npm install
Set up environment variables
.env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
Run the server

## Frontend Setup:
cd  HobbyHive_Hobby-Sharing-Platform/frontend
npm install
.env (/frontend):
VITE_BACKEND_URL=url
npm run dev

🛠 API Endpoints
Auth
POST /api/users/signup — Register new user

POST /api/users/login — Login user (returns JWT)

POST /api/users/logout — Logout user (blacklists JWT)

POST /api/users/forgot-password — Request password reset email

POST /api/users/reset-password/:token — Reset password

User
GET /api/users/profile — Get logged-in user profile (Protected)

PUT /api/users/profile — Update user profile (hobbies, bio, profilePic) (Protected)

Hobby
GET /api/hobbies — List all hobbies

POST /api/hobbies — Add new hobby (Protected)

PUT /api/hobbies/:id — Update hobby (Protected)

DELETE /api/hobbies/:id — Delete hobby (Protected)


💡 Features
Strong JWT auth with token blacklisting to prevent reuse after logout

Password reset via email with secure expiring tokens

Middleware protects sensitive routes

Modular structure for easy maintenance and scaling


📬 Contact
Sharu – GitHub
For questions or collabs, shoot a message!
