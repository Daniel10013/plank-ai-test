# Activity Summary & Trends App

This project is a full-stack application built with Node.js (backend) and React + TypeScript (frontend). It loads user activity data from a CSV file and provides statistical insights and visual trends through a REST API and interactive UI.

---

## Table of Contents

- Overview
- Backend
  - Installation & Setup
  - API Endpoints
  - Data Validation & Performance
- Frontend
  - Installation & Setup
  - Features
  - Input Validation
- Sample Data
- Technologies Used

---

## Overview

This app processes user activity logs from a CSV source and allows:

- Fetching statistical summaries for a specific user
- Visualizing top user-action pairs across time ranges

---

## Backend

### Installation & Setup

1. Clone the repository:
   git clone https://your-repository-url
   cd your-project-folder

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. (Optional) Load the CSV data manually:
   curl -X POST http://localhost:3000/load

### API Endpoints

POST /load
Fetches and loads the activities CSV into memory.

GET /summary/:userId
Returns a summary of a specific user's activity.

Query Parameters (optional):
- start_time (ISO 8601)
- end_time (ISO 8601)

Example:
GET /summary/42?start_time=2024-01-01T00:00:00Z&end_time=2024-06-30T23:59:59Z

Response:
{
  "total_actions": 8,
  "most_frequent_action": "click",
  "average_duration": 128.5,
  "most_frequent_page": "dashboard"
}

GET /action_trends
Returns the top 3 (user_id + action) pairs by frequency in a time range.

Query Parameters (required):
- start_time (ISO 8601)
- end_time (ISO 8601)

Example:
GET /action_trends?start_time=2024-01-01T00:00:00Z&end_time=2024-12-31T23:59:59Z

Response:
{
  "status": true,
  "trending_actions": [
    { "user_id": 81, "action": "upload", "count": 4 },
    { "user_id": 54, "action": "view", "count": 3 },
    { "user_id": 66, "action": "login", "count": 3 }
  ]
}

---

### Data Validation & Performance

- The backend performs strict validation for:
  - CSV column structure and types
  - Valid JSON strings in metadata
  - Query parameter formats and presence

- The data is stored in memory using efficient structures for:
  - Fast lookups by user
  - Aggregations by action
  - Filtering by time range

- The system responds in under 1 second with up to 5000 rows.

---

## Frontend

### Installation & Setup

1. Go to the client directory:
   cd client
   npm install
   npm run dev

2. Access the app:
   http://localhost:5173

### Features

User Summary

- Inputs:
  - user_id (required)
  - start_time, end_time (optional)
- Displays:
  - Total actions
  - Most frequent action
  - Average duration
  - Most frequent page

User-Action Trends

- Inputs:
  - start_time, end_time (required)
- Displays:
  - A bar chart with the top 3 (user_id, action) pairs
  - Each bar shows the exact count

### Input Validation

- All fields are validated client-side
- Buttons are disabled while fetching
- Toast notifications show success or error messages
- Invalid inputs (e.g., empty fields or wrong formats) are rejected

---

## Sample Data

The app expects a CSV in this format:

user_id,timestamp,action,metadata
42,2024-05-01T12:30:00Z,login,{"page": "home", "duration": 120}

- user_id: Integer
- timestamp: ISO 8601 format
- action: String (e.g., login, click)
- metadata: JSON string (must include "page" and "duration")

---

## Technologies Used

Backend:
- Node.js
- Express
- csv-parser
- TypeScript

Frontend:
- React
- TypeScript
- Chart.js (via react-chartjs-2)
- React Toastify

---

## Author

Project built as a full-stack technical challenge, with a focus on performance, data integrity, and clarity in UI/UX.
