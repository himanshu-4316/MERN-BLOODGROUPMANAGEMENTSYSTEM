# 🩸 Blood Group Management System

A full-stack MERN web application for managing blood donors. It allows users to register donors, track blood group availability, search and filter records, and view or update individual donor profiles.

---

## 📸 Features

- **Dashboard Stats** — View total donors, available/unavailable count, and the most common blood group at a glance
- **Blood Group Filter Buttons** — Quickly filter donors by blood group with a single click
- **Search** — Filter donors by name, blood group, city, contact number, or units available
- **Add Donor** — Register a new donor with all relevant details
- **View / Edit / Delete** — Manage individual donor records from the detail page
- **Auto Availability Status** — A donor is automatically marked as `Available` if they have units > 0 and their last donation was 90+ days ago

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
|-----------|------------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS, DaisyUI   |
| Routing   | React Router DOM v7                     |
| HTTP      | Axios                                   |
| Notifications | React Hot Toast                     |
| Icons     | Lucide React, React Icons               |
| Backend   | Node.js, Express 5                      |
| Database  | MongoDB (Mongoose)                      |
| Dev Tool  | Nodemon                                 |

---

## 📁 Project Structure

```
BloodGroupManagementSystem/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── connectDB.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   └── donorController.js    # CRUD logic
│   │   ├── models/
│   │   │   └── donorModel.js         # Mongoose schema
│   │   ├── routes/
│   │   │   └── donorRoutes.js        # API routes
│   │   └── server.js                 # Express app entry point
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── DonorCard.jsx
    │   │   ├── DonorNotFound.jsx
    │   │   └── Navbar.jsx
    │   ├── lib/
    │   │   ├── axios.js              # Axios base instance
    │   │   └── utils.js
    │   ├── pages/
    │   │   ├── HomePage.jsx          # Donor list + dashboard
    │   │   ├── CreatePage.jsx        # Add donor form
    │   │   └── DonorDetailPage.jsx   # View/edit/delete donor
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blood-group-management-system.git
cd blood-group-management-system
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

The server will run at `http://localhost:3000`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

## 🔌 API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint        | Description          |
|--------|-----------------|----------------------|
| GET    | `/donors`       | Get all donors       |
| GET    | `/donors/:id`   | Get a donor by ID    |
| POST   | `/donors`       | Create a new donor   |
| PUT    | `/donors/:id`   | Update a donor       |
| DELETE | `/donors/:id`   | Delete a donor       |

---

## 🧬 Donor Schema

| Field             | Type     | Required | Notes                                      |
|-------------------|----------|----------|--------------------------------------------|
| `donorName`       | String   | ✅       |                                            |
| `bloodGroup`      | String   | ✅       | e.g. A+, O-, AB+                          |
| `age`             | Number   | ✅       |                                            |
| `contact`         | String   | ✅       |                                            |
| `city`            | String   | ✅       |                                            |
| `lastDonationDate`| Date     | ❌       |                                            |
| `unitsAvailable`  | Number   | ✅       |                                            |
| `status`          | String   | —        | Auto-set: `Available` or `Not Available`  |

**Availability Logic:** A donor is set to `Available` automatically if `unitsAvailable > 0` AND the last donation was at least 90 days ago.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
