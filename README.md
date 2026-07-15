# BOOK A DOCTOR - eSCHEDULING 🏥✨

A full-stack, responsive healthcare scheduling and appointment booking platform built using the modern **MERN stack** (MongoDB, Express, React, Node.js) and styled with a premium dark-mode healthcare tech theme using Tailwind CSS v4.0.

---

## 🌟 Key Capabilities & User Roles

This platform is architected around three core user roles, each with custom workflows, views, and dashboards:

### 1. Patients 👤
* **Secure Registration & Login**: Multi-step registration incorporating contact information and secure password hashing.
* **Specialist Directory**: Live search and filter doctors by name and clinical specialization (e.g., Cardiology, Pediatrics, Neurology, Orthopedics, Gynecology).
* **Frictionless Appointment Booking**: Request consultation appointments on selected dates and open time slots.
* **Prescription & Medical Records Upload**: Safe and secure digital attachment of lab reports or history files (using Multer storage).
* **Interactive Patient Dashboard**: Real-time overview of current appointments status (Pending, Confirmed, Cancelled) and history notes.

### 2. Doctors 🥼
* **Doctor Profile Customization**: Modify medical bio, experience (years), consultation fees, and weekly availability slots (days of the week and specific hours).
* **Live Appointment Manager**: Accept, confirm, or decline/cancel appointment requests from patient portals.
* **Patient History Review**: Access documents and prescriptions uploaded by patients for specific scheduling sessions.
* **Specialist Border Highlight**: Clear UI identifiers (e.g. Baby Pink highlights for Pediatrics, Purple badges for Cardiology) to make doctor listings easily scannable.

### 3. System Administrator 🔑
* **Clinic Analytics Dashboard**: Audit overview of system metrics (total doctors, pending requests, active patients, and booking volumes).
* **Doctor Credentialing & Approval**: Admin reviews and approves pending doctor sign-ups before they appear publicly in search directory.
* **User Audit**: Delete accounts or ban users violating policies.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technology | Primary Libraries |
| :--- | :--- | :--- |
| **Frontend** | React 18 (Vite) | Tailwind CSS v4.0, Axios (interceptors), React Router DOM, Bootstrap Icons |
| **Backend** | Node.js (ESM) | Express.js, Cors, Dotenv |
| **Database** | MongoDB | Mongoose (object mapping, indexing) |
| **Auth** | JSON Web Tokens | JWT-based secure sessions, `bcryptjs` (password hashing) |
| **File Sharing** | Multer | Multipart/form-data middleware for prescription files |

---

## 📂 Codebase Architecture

```bash
BOOK-A-DOCTOR-eSCHEDULING/
├── client/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Core stylesheets and image assets
│   │   ├── components/          # Reusable components (Navbar, ProtectedRoute)
│   │   ├── pages/               # Views (Home, Login, Register, Dashboards, Booking, Profiles)
│   │   ├── services/            # Client-side API Axios instance and services
│   │   ├── App.css              # Custom styling definitions
│   │   ├── App.jsx              # Client routing configuration
│   │   ├── index.css            # Tailwind directives and design tokens
│   │   └── main.jsx             # React entrypoint
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/                  # Database connection settings
│   ├── controllers/             # Request handlers (auth, doctor, appointment, admin)
│   ├── middleware/              # Auth guard (JWT) and file upload helper (Multer)
│   ├── models/                  # Mongoose schemas (User, Doctor, Appointment)
│   ├── routes/                  # Express endpoints router mounts
│   ├── uploads/                 # Storage path for prescriptions/reports
│   ├── Dockerfile
│   ├── package.json
│   ├── seed.js                  # Database seeder utility script
│   └── server.js                # Express entrypoint and error handler logic
├── docker-compose.yml
├── package.json                 # Root script runner (Concurrently launcher)
└── README.md
```

---

## 🗄️ Database Schemas & Data Model

### 1. User Schema (`User.js`)
Stores all platform users (patients, doctors, admins).
* **Fields**: `name`, `email` (unique, validated), `password` (hashed with salt), `role` (enum: `'patient'`, `'doctor'`, `'admin'`), `contactInfo`.
* **Timestamps**: Automatically tracks `createdAt` and `updatedAt`.

### 2. Doctor Schema (`Doctor.js`)
Extends user account for doctor-specific profiles.
* **Fields**: `user` (ref User), `specialization`, `bio`, `experience` (min 0), `fees` (min 0), `availability` (day & slots structure), `isApproved` (default: `false`).

### 3. Appointment Schema (`Appointment.js`)
Manages scheduling requests.
* **Fields**: `doctor` (ref Doctor), `patient` (ref User), `date` (YYYY-MM-DD), `timeSlot` (e.g. "10:00 AM"), `status` (enum: `'pending'`, `'confirmed'`, `'cancelled'`), `notes`, `documentPath` (uploaded prescription route), `documentName`.
* **Index**: Compound index on `{ doctor: 1, date: 1, timeSlot: 1 }` to prevent double-booking checks.

---

## 🔌 API Reference & Endpoints

All requests require authorization headers `Bearer <JWT_TOKEN>` for Private endpoints.

### Authentication
* `POST /api/auth/register` - Create a new user account (patient/doctor).
* `POST /api/auth/login` - Authenticate credentials and return JWT.
* `GET /api/auth/me` (Private) - Get current user profile details.

### Doctors
* `GET /api/doctors` - Fetch all approved doctors (supports query filtering: `search`, `specialization`).
* `GET /api/doctors/:id` - View detailed doctor profile.
* `PUT /api/doctors/profile` (Private: Doctor only) - Update bio, fees, experience, and availability.

### Appointments
* `POST /api/appointments` (Private: Patient only) - Book slot. Supports uploading prescription (`multipart/form-data` with `document` field).
* `GET /api/appointments` (Private) - Fetch appointments (shows relevant list based on Patient, Doctor, or Admin role).
* `PUT /api/appointments/:id/status` (Private) - Update booking status to `confirmed` or `cancelled`.

### Admin Operations (Private: Admin only)
* `GET /api/admin/pending-doctors` - Get list of doctors waiting approval.
* `PUT /api/admin/doctors/:id/approve` - Approve or reject doctor profile.
* `GET /api/admin/users` - Fetch list of all registered patients/doctors.
* `DELETE /api/admin/users/:id` - Delete user account.
* `GET /api/admin/stats` - Fetch aggregate clinic metrics.

---

## 🚀 Getting Started & Setup

### 1. Prerequisites
Make sure you have the following installed locally:
* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional, if you spin up local MongoDB container)

### 2. Environment Variables Configuration

Create a `.env` file in the **server** directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/book-my-doctor
JWT_SECRET=supersecuresecretkey123
JWT_EXPIRES_IN=7d
```

Create a `.env` file in the **client** directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Database Initialization
Spin up a local MongoDB instance. If using Docker, start the container:
```bash
docker run -d --name book-my-doctor-mongo -p 27017:27017 mongo:latest
```
*(If the container is already created, start it using: `docker start book-my-doctor-mongo`)*

### 4. Dependency Installation
Navigate to the root directory and run the helper package installer script:
```bash
npm install
```
Then run:
```bash
npm run install-all
```
This automatically installs node modules inside both the `client/` and `server/` subfolders.

### 5. Seeding Default Accounts
To populate your database with pre-configured accounts (admin, patients, approved/pending doctors), execute:
```bash
npm run seed
```

### 6. Launch Application
Start the concurrently run system:
```bash
npm run dev
```
* The React web client launches at: [http://localhost:5173](http://localhost:5173)
* The Express server listens at: [http://localhost:5000](http://localhost:5000)

---

## 👥 Seed Credentials & Verification

Use the following pre-seeded credentials to verify role-based layouts:

| Role | Email Address | Password | Account Details & Responsibilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin123` | Control panel access: approve doctor requests, delete users, audit clinics |
| **Patient** | `patient1@gmail.com` | `patient123` | Patient dashboard: search listings, schedule slot, upload document, view history |
| **Doctor (Approved)** | `doctor1@gmail.com` | `doctor123` | Dr. Jane Hart (Cardiology): manage availability slots, confirm or cancel requests |
| **Doctor (Pending)** | `doctor2@gmail.com` | `doctor123` | Dr. Bruce Child (Pediatrics): profile waiting for Admin approval before listing |

---

## 🎨 Theme & Visual Guidelines

The platform uses a dark-mode medical tech theme configuration in Tailwind:
* **Background Canvas**: Night Blue (`#0F172A`)
* **Widget Cards**: Dark Slate (`#1E293B`)
* **Primary highlights**: Cyber Cyan (`#06B6D4`)
* **Action Buttons**: Medical Teal (`#0D9488`)
* **Pediatric Accents**: Baby Pink borders (`#FBCFE8`)
* **Specialist badges**: Premium Purple indicators (`#7C3AED`)
* **Emergency/Cancel Alerts**: Emergency Red (`#EF4444`)

---

## 🔧 Troubleshooting & FAQs

#### 1. MongoDB Connection Refused / Server Exit
* **Cause**: MongoDB service or Docker container is not running.
* **Fix**: Run `docker ps` to verify container is running. If not, start it or check if local MongoDB service is listening on port `27017`.

#### 2. Prescription File Upload Fails
* **Cause**: The `server/uploads` directory may not exist or does not have write permissions.
* **Fix**: The backend automatically handles directory creation, but make sure Express has directory write permission.

#### 3. CORS Error on Request Interception
* **Cause**: Misalignment in `.env` configuration.
* **Fix**: Ensure your React application's `.env` points exactly to `http://localhost:5000/api` and matches the Express listener configuration.
