@ -0,0 +1,73 @@
# BOOK A DOCTOR-eSCHEDULING

A full-stack, responsive healthcare scheduling and appointment booking platform built using the MERN stack (MongoDB, Express, React, Node.js) and stylized with a premium dark-mode healthcare tech theme using Tailwind CSS v4.0.

---

## Tech Stack
* **Frontend**: React (Vite), Tailwind CSS v4.0, Axios, React Router, Bootstrap Icons
* **Backend**: Node.js, Express.js (ESM)
* **Database**: MongoDB (local container or Atlas instance via Mongoose)
* **Authentication**: JWT-based secure sessions, bcrypt password hashing
* **File Sharing**: Multer middleware for secure prescription and lab report uploads

---

## Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (version 18 or above recommended)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for spinning up local MongoDB)

### 2. Database Initialization
Spin up the local MongoDB container on the default port `27017` by running:
```bash
docker start book-my-doctor-mongo
```
*(If the container is not created, you can create it with: `docker run -d --name book-my-doctor-mongo -p 27017:27017 mongo:latest`)*

### 3. Install Dependencies
At the root directory, run:
```bash
npm install
```
This automatically installs the dependencies for the server and client sub-folders.

### 4. Database Seeding
To seed clean default accounts (admin, patients, approved/pending doctors), run:
```bash
npm run seed
```

### 5. Running the Application
To launch both the client and server concurrently in development mode, run:
```bash
npm run dev
```
* **Express Backend** will listen at: `http://localhost:5000/`
* **Vite Client Portal** will open at: `http://localhost:5173/`

---

## Seed Accounts and Credentials

Use the following accounts to verify the different role-based views (Patient, Doctor, Admin):

| Role | Email Address | Password | Details |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin123` | Approves pending doctor requests, audits stats. |
| **Patient** | `patient1@gmail.com` | `patient123` | Can search specialists and request appointments. |
| **Doctor (Approved)** | `doctor1@gmail.com` | `doctor123` | Dr. Jane Hart (Pediatrician, Pink Border highlight). |
| **Doctor (Pending)** | `doctor2@gmail.com` | `doctor223` | Dr. Bruce Child (Cardiologist). Requires Admin approval. |

---

## Design and Visual System
* **Background**: Night Blue (`#0F172A`)
* **Cards**: Dark Slate (`#1E293B`)
* **Primary highlights**: Cyber Cyan (`#06B6D4`)
* **Active buttons**: Medical Teal (`#0D9488`)
* **Specialist indicators**: Premium Purple badges (`#7C3AED`)
* **Wellness/Pediatrics Card**: Accentuated with Baby Pink border (`#FBCFE8`)
* **Urgent Actions**: Emergency Red (`#EF4444`) for critical doctor on-call alerts.
