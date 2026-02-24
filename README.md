# Job Application Tracker

## Overview

Job Application Tracker is a full-stack web application designed to help users manage and monitor job applications in a structured and persistent way.

The system allows users to create, view, update, and delete job application records. Data is stored in a SQL database and accessed through a RESTful API built with Node.js and Express.

This project was built as a practical exercise in full-stack development, focusing on API design, database integration, and frontend-backend communication.

---

## Features

- Create new job applications
- View all stored applications
- Update application status
- Delete applications
- Persistent storage using SQLite
- RESTful API architecture
- Modal-based UI interactions

---

## Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript (Fetch API)

### Backend
- Node.js
- Express.js

### Database
- SQLite

---

## Architecture

The application follows a simple client-server architecture:

Frontend (HTML/CSS/JS)  
→ Fetch API requests  
→ Express REST API  
→ SQLite Database  

The frontend communicates with the backend using asynchronous HTTP requests. The backend handles routing, business logic, and database interaction.

---

## Database Schema

Table: `job_applications`

| Column        | Type      | Description |
|--------------|----------|------------|
| id           | INTEGER  | Primary key, auto-increment |
| job_title    | TEXT     | Title of the position |
| company      | TEXT     | Company name |
| status       | TEXT     | Application status |
| date_applied | DATE     | Date of submission |
| created_at   | DATETIME | Timestamp of record creation |

---

## API Endpoints

### GET /applications
Returns all job applications ordered by creation date.

### GET /applications/:id
Returns a single job application by ID.

### POST /applications
Creates a new job application.

Request body:
```json
{
  "job_title": "Software Engineer",
  "company": "Company Name",
  "date_applied": "2026-02-24"
}
```

### PUT /applications/:id
Updates the status of an existing application.

Request body:
```json
{
  "status": "Interview"
}
```

### DELETE /applications/:id
Deletes an application by ID.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/job-application-tracker.git
cd job-application-tracker
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The server runs locally at:

http://localhost:3000

---

## Current Functionality

- Full CRUD operations implemented
- Backend connected to SQLite database
- Frontend integrated using Fetch API
- Dynamic table rendering
- Modal-based form interaction
- Status update via PUT request
- Record deletion via DELETE request

---

## Engineering Considerations

- RESTful route structure
- Separation of concerns between frontend and backend
- Parameterized SQL queries to prevent injection
- Asynchronous request handling with async/await
- Event delegation for dynamically generated elements

---

## Future Improvements

- User authentication and session management
- Filtering and search functionality
- Status-based color indicators
- Pagination for scalability
- Input validation and error handling improvements
- Environment variable configuration
- Production deployment configuration
- CI/CD integration

---

## Deployment (Planned)

The application is intended to be deployed using:

- Render (full-stack deployment)
- Vercel (frontend deployment)
- SQLite replaced with a production-ready database if scaled

---

## Purpose

This project was developed to:

- Strengthen full-stack development skills
- Practice REST API design
- Work with SQL database integration
- Improve frontend-backend communication patterns
- Build a practical, real-world utility application

The repository is maintained as an open-source project.

---
