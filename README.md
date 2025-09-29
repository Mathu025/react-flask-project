# React Frontend - TravelBuddy

This is the **frontend** of the TravelBuddy project, built with **React** and **Vite**.  
It provides the user interface for interacting with the Flask backend API.

---

##  Features
- Modern React frontend with Vite
- Fetches data from Flask backend API
- Displays trips, travel groups, and users
- Interactive UI with JSX components
- Hot-reload for fast development

---

## Tech Stack
- **React** (UI library)
- **Vite** (development + build tool)
- **JavaScript (ES6+)**
- **CSS / JSX styling**

---

## Installation & Setup

1. Navigate to the frontend folder:
```bash
   cd Client/client
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```
The frontend is set to run on (http://localhost:5173)

3. Backend Connection
Make sure the Flask backend is running on its server http://127.0.0.1:5555

## Project Structure
travelbuddy/
│
├── Client/
│   └── client/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   ├── NavBar.js
│       │   │   ├── Home.js
│       │   │   ├── About.js
│       │   │   ├── Links.js
│       │   │   └── TripCard.js
│       │   ├── data/
│       │   ├── pages/
│       │   │   ├── TripsPage.js
│       │   │   ├── GroupsPage.js
│       │   │   └── UsersPage.js
│       │   ├── App.js
│       │   ├── main.jsx
│       │   └── index.css
│       ├── .gitignore
│       ├── package.json
│       └── vite.config.js
│
├── Server/
│   ├── migrations/
│   ├── models.py
│   ├── app.py
│   ├── seed.py
│   ├── config.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── trip_routes.py
│   │   ├── group_routes.py
│   │   └── user_routes.py
│   ├── requirements.txt
│   ├── Pipfile / Pipfile.lock
│   └── instance/
│       └── travelbuddy.db
│
├── README.md
└── .gitignore


---

# Flask Backend TravelBuddy

A Flask-based backend application for managing users, trips, and travel groups.  
This project uses **Flask**, **Flask-RESTful**, **Flask-Migrate**, **SQLAlchemy**, and **PostgreSQL** as the database.

---

## Features

- User management (create, read, update, delete).
- Travel group creation and membership handling.
- Trip creation and association with users and groups.
- RESTful API with JSON responses.
- Database migrations using Alembic/Flask-Migrate.
- CORS enabled for frontend integration (React or any other client).

---

## Technologies Used

- **Flask** – Web framework
- **Flask-RESTful** – For building REST APIs
- **Flask-Migrate** – Database migrations
- **SQLAlchemy** – ORM for database interaction
- **PostgreSQL** – Database
- **Flask-CORS** – Handle cross-origin requests

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/travelbuddy-api.git
cd travelbuddy-api
```
### 2. Create a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows
```
### 3.Install dependencies
```bash
pip install -r requirements.txt
```
### 4.Configure Environment Variables
Create a .env file in the root directory:
FLASK_APP=app.py
FLASK_ENV=development
SQLALCHEMY_DATABASE_URI=postgresql://username:password@localhost:5432/travelbuddy
SECRET_KEY=your-secret-key
### 5. Initialize Database
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```
### 6. Run the application
```bash
flask run
```
The server will start at (http://127.0.0.1:5555)/

---

## API Endpoints
### Users
GET /users – Get all users
POST /users – Create a new user
GET /users/<id> – Get a specific user
PATCH /users/<id> – Update a user
DELETE /users/<id> – Delete a user

### Trips
GET /trips – Get all trips
POST /trips – Create a new trip
GET /trips/<id> – Get a specific trip
PATCH /trips/<id> – Update a trip
DELETE /trips/<id> – Delete a trip

### Travel Groups

GET /travelgroups – Get all travelgroups
POST /travelgroups – Create a new travelgroup
GET /travelgroup/<id> – Get a specific travelgroup
PATCH /travelgroup/<id> – Update a travelgroup
DELETE /travelgroup/<id> – Delete a travelgroup

### Group Memberships
GET /groupmemberships – Get all groupmemberships
POST /groupmemberships – Create a new groupmembership
GET /groupmembership/<id> – Get a specific groupmembership
PATCH /groupmembership/<id> – Update a groupmemberships
DELETE /groupmembership/<id> – Delete a groupmemberships

---

## Deployment
For production, deploy to Render

Deployment link = "https://react-flask-project-5.onrender.com/"

Backend link using gunicorn = "http://127.0.0.1:8000/" (/users, /trips, /travelgroups)

---

## Contributing
1. Fork the repository

2. Create a new feature branch: git checkout -b feature-name

3. Commit your changes: git commit -m "Add new feature"

4. Push to the branch: git push origin feature-name

5. Open a Pull Request

---

## License
---

## 📜 License

This project is licensed under the **MIT License**.

© 2025 Alex Mathu & Cheryl Mbani
