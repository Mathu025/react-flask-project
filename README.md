# TravelBuddy API

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
