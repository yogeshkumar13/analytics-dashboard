## Product Analytics Dashboard

## Project Overview

This project is an **Interactive Product Analytics Dashboard** built using the **MERN stack (React + Node.js + PostgreSQL)**.
It allows users to register, log in, and track feature interactions. The dashboard displays analytics using charts and filters.

The system records each user action (feature click) and visualizes aggregated data through bar and line charts.

---

## Features

* User Registration and Login (Authentication)
* Secure JWT-based authentication
* Track user feature clicks
* Analytics Dashboard with charts
* Filter data by:

  * Date Range
  * Age Group
  * Gender
* Persistent login on refresh
* Responsive UI
* REST API integration
* Database seeding with sample data
* Deployed frontend and backend

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* Recharts
* React Router DOM
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST APIs

### Database

* PostgreSQL (Neon)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

```
project-root
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│
├── backend
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── analyticsRoutes.js
│   ├── server.js
│
└── README.md
```

---

## Authentication Flow

1. User registers
2. User logs in
3. JWT token is generated
4. Token stored in localStorage
5. Protected dashboard access
6. Token persists after refresh

---

## 🗄️ Database Tables

### Users Table

```
users
------
id
username
password
age
gender
created_at
```

### Feature Clicks Table

```
feature_clicks
--------------
id
user_id
feature_name
timestamp
```

---

## 📡 API Endpoints

### Register User

```
POST /register
```

### Login User

```
POST /login
```

### Track Feature Click

```
POST /track
```

### Get Analytics Data

```
GET /analytics
```

### Get User Click Count

```
GET /user-clicks
```


## Run Project Locally

### Backend

```
cd backend
npm install
npm start
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## Deployment Links

Frontend:

```
https://analytics-dashboard-iota-beryl.vercel.app/
```

Backend:

```
https://analytics-dashboard-22ku.onrender.com
```

---

##  Sample Analytics Example

The system tracks feature usage such as:

* Date Filter Click
* Gender Filter Click
* Chart Interaction

Example aggregated data:

```
Feature Name     Total Clicks
Date Filter      10
Gender Filter    6
Bar Chart        4
```

## Author

**Yogesh Kumar**

Full Stack Developer
Skills:

* React.js
* Node.js
* PostgreSQL
* REST APIs
* Authentication
* Deployment

---

## Future Improvements

* Real-time analytics
* Role-based authentication
* Export reports (PDF / Excel)
* Advanced filtering
* Performance optimization

---

## Project Status

✔ Authentication Completed
✔ Dashboard Completed
✔ Analytics Tracking Completed
✔ Charts Implemented
✔ Deployment Completed

---

**Thank you for reviewing this project.**
