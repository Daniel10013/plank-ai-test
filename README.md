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
- Technologies Used

---

## Overview

This app processes user activity logs from a CSV source and allows:

- Fetching statistical summaries for a specific user
- Visualizing top user-action pairs across time ranges

---

## Backend

### Installation & Setup

Clone the repository and go to the API folder:
```
git clone https://github.com/Daniel10013/plank-ai-test.git
cd api   
```

Install dependencies:
```
npm install
```

Start the development server:
```
npm run dev
```
   
### API Endpoints

#### Load Data

```
GET /load_data
```
Fetch the data from the CSV file online, and store it on the runtime memory.

No response is provided, only a message and the status to tell if it worked or no.

# 

#### User Summary
```
GET /summary/:userId
```
Returns a summary of a specific user's activity.

Query Parameters (optional):
- start_time (ISO 8601)
- end_time (ISO 8601)

Example:
```
GET /summary/42?start_time=2024-01-01T00:00:00Z&end_time=2024-06-30T23:59:59Z
```

Response:
```json
{
    summary: {
    "total_actions": 8,
    "most_frequent_action": "click",
    "average_duration": 128.5,
    "most_frequent_page": "dashboard"
    }, 
    status: true | false
}
```
# 

#### Actions trends

```
GET /action_trends
```
Returns the top 3 (user_id + action) pairs by frequency in a time range.

Query Parameters (required):
- start_time (ISO 8601)
- end_time (ISO 8601)

Example:
```
GET /action_trends?start_time=2024-01-01T00:00:00Z&end_time=2024-12-31T23:59:59Z
```

Response:
```json
{
  "trending_actions": [
    { "user_id": 81, "action": "upload", "count": 4 },
    { "user_id": 54, "action": "view", "count": 3 },
    { "user_id": 66, "action": "login", "count": 3 }
  ],
  "status": true | false,
}
```

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
Run the following commands:
```
cd front-end
npm install
npm run dev
```

Access the app at:
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

## Technologies Used

Backend:
- Node.js
- Express
- TypeScript

Frontend:
- React
- TypeScript
- Chart.js (via react-chartjs-2)
- React Toastify

## Author

Project built as a full-stack technical challenge, with a focus on performance, data integrity.

Developed by: [Daniel Filipe](https://linkedin.com/in/daniel-filipe-cv)
