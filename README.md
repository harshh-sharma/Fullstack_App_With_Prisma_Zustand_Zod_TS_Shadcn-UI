# 🚀Advanced-Task-Management-Platform-MERN-Prisma-Zustand-Stripe-Shadcn

A **production-ready task management platform** with:  
- 🔐 Secure authentication  
- 🛡️ Role-based dashboards (Admin/User)  
- 💳 Subscription-based feature upgrades using **Stripe**  
- 🎨 Modern UI powered by **Shadcn/UI**  

Built with **MERN stack** and **Prisma ORM** for scalable backend operations. 

---

## ✨ Features

- 🔑 **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin/User)
  - Persistent login using Zustand & localStorage
- ✅ **Task Management**
  - Create, update, delete, and view tasks
  - Change task status (Pending → In Progress → Done)
  - Ownership checks (only owner or admin can update/delete)
- 👨‍💻 **Admin Panel**
  - Manage all users and their tasks
  - Role-specific dashboards
- 💳 **Stripe Integration**
  - Secure checkout flow
  - Webhook support to verify payments
- 🎨 **Frontend**
  - Built with React + Vite
  - State management with Zustand
  - Modern, accessible UI using Shadcn/UI components
- 🛠️ **Backend**
  - Express.js API
  - Prisma ORM with PostgreSQL
  - Zod for request validation
  - Centralized error handling
- 📂 **Project Structure**
  - Clear separation of `features`, `components`, `services`, and `pages`
  - Reusable UI + shared logic

---

## 🏗️ Tech Stack

### Frontend
- ⚛️ **React (Vite)**
- 🎨 **TailwindCSS + Shadcn/UI**
- 📦 **Zustand** (state management)
- 🌐 **Axios** (API calls)
- 🔒 **JWT Auth handling**

### Backend
- 🟢 **Node.js + Express**
- 🗄️ **Prisma ORM** (with PostgreSQL)
- 🛡️ **Zod** (validation)
- 🔑 **jsonwebtoken** (auth)
- ⚡ **Stripe SDK** (payments)

---

## 📂 Project Structure

