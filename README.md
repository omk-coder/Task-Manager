# Task Manager

[Live-Link](https://task-manager-wheat-phi-78.vercel.app/auth/login)

## 📌 Overview
Task Manager is a web application that helps users efficiently manage their tasks with filtering, sorting, and priority-based categorization. Built using modern web technologies, this project provides an interactive and user-friendly task management experience.

## 🚀 Features
- ✅ Create, update, and delete tasks
- 📌 Set task priorities (High, Medium, Low)
- 🎯 Mark tasks as completed
- 🔍 Filter, sort, and search tasks
- 🔒 Secure authentication and user management
- 🎨 Responsive and beautiful UI using **ShadCN & TailwindCSS**

## 🛠️ Tech Stack
- **Frontend:** Next.js, TailwindCSS, ShadCN
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## 📂 Project Structure
```bash
Task-Manager/
│-- app/
│   ├── api/           # UI components
│   ├── auth/          # Next.js pages
│   ├── dashboard/     # API calls and services
│   ├── global.css     # State management
│   ├── layout.jsx     # Custom hooks
│   ├── page.jsx       # Global styles
│-- components/        # Static assets
│-- models/            # Static assets
│-- lib/               # Static assets
│-- public/            # Static assets
│-- redux/             # Static assets
│-- utils/             # Static assets
│-- hooks/             # Static assets
│-- .env               # Environment variables
│-- package.json       # Dependencies and scripts
│-- README.md          # Project documentation
```

## 📦 Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/omk-coder/Task-Manager.git
   cd Task-Manager
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment
This project can be deployed using **Vercel**. Ensure that environment variables are set in your Vercel dashboard before deploying.

## 🔥 Screenshots
<img width="959" alt="taskimage" src="https://github.com/user-attachments/assets/e799e750-6fe2-46c4-a36c-d298487c3a5d" />


## 📌 Future Enhancements
- [ ] Add drag-and-drop feature for task reordering
- [ ] Implement notifications and reminders
- [ ] Integrate with automate email notification, user will get notify one-two days ago before Due Date
- [ ] Implement of multilanguage
