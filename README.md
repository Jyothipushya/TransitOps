# 🚛 TransitOps - Smart Fleet & Transport Management System

## Odoo Hackathon 2026

TransitOps is a full-stack Fleet and Transport Management System developed using the MERN stack for the Odoo Hackathon 2026.

The system enables organizations to efficiently manage vehicles, drivers, trips, maintenance, fuel, expenses, and analytics from a centralized dashboard.

---

## 👥 Team

| Name | Role |
|------|------|
| Team Member 1 | Frontend Developer |
| Team Member 2 | Backend Developer |

---

# 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js

---

# 📁 Project Structure

```
TransitOps
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── routes
│   │   └── App.jsx
│   │
│   └── package.json
│
└── backend
    ├── src
    │
    ├── config
    │
    ├── controllers
    │
    ├── middlewares
    │
    ├── models
    │
    ├── routes
    │
    ├── utils
    │
    ├── app.js
    └── server.js
```

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Role Based Authorization (RBAC)

---

## Vehicle Management

- Add Vehicle
- Update Vehicle
- Delete Vehicle
- View Vehicles
- Vehicle Availability Tracking

---

## Driver Management

- Add Driver
- Update Driver
- Delete Driver
- Driver Status Management
- License Information

---

## Trip Management

- Create Trip
- Assign Driver
- Assign Vehicle
- Update Trip Status
- Track Trips

---

## Maintenance Management

- Schedule Maintenance
- Track Maintenance History
- Vehicle Service Records

---

## Fuel Management

- Record Fuel Logs
- Fuel Consumption Tracking

---

## Expense Management

- Record Expenses
- Expense Categories
- Expense History

---

## Dashboard

- Fleet Overview
- Vehicle Statistics
- Driver Statistics
- Active Trips
- Maintenance Summary
- Expense Analytics

---

## Reports

- Trip Reports
- Fuel Reports
- Expense Reports
- Fleet Statistics

---

# 🔐 User Roles

- Fleet Manager
- Driver
- Safety Officer
- Financial Analyst

---

# Backend APIs

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
```

---

## Vehicles

```
POST   /api/vehicles
GET    /api/vehicles
GET    /api/vehicles/:id
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id
```

---

## Drivers

```
POST   /api/drivers
GET    /api/drivers
GET    /api/drivers/:id
PUT    /api/drivers/:id
DELETE /api/drivers/:id
```

---

## Trips

```
POST   /api/trips
GET    /api/trips
GET    /api/trips/:id
PUT    /api/trips/:id
DELETE /api/trips/:id
```

---

## Maintenance

```
POST   /api/maintenance
GET    /api/maintenance
GET    /api/maintenance/:id
PUT    /api/maintenance/:id
DELETE /api/maintenance/:id
```

---

## Fuel

```
POST   /api/fuel
GET    /api/fuel
GET    /api/fuel/:id
PUT    /api/fuel/:id
DELETE /api/fuel/:id
```

---

## Expenses

```
POST   /api/expenses
GET    /api/expenses
GET    /api/expenses/:id
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

---

## Dashboard

```
GET /api/dashboard
```

---

## Reports

```
GET /api/reports
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

# Security

- JWT Authentication
- Password Hashing (bcrypt)
- Role Based Authorization
- Protected Routes
- MongoDB Validation

---

# Future Enhancements

- GPS Tracking
- Real-time Vehicle Location
- Email Notifications
- Predictive Maintenance
- Analytics Dashboard
- Export Reports (PDF/Excel)
- Push Notifications

---

# Developed For

**Odoo Hackathon 2026**

---

# License

This project is developed for educational and hackathon purposes.
