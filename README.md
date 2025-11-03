# Djano-Expense-tracker

Expense Tracker (Django + React)

A full-stack Expense Tracker Application built with Django (REST API) as the backend and React as the frontend.
It allows users to add, edit, delete, filter, and sort expenses by category, month, and amount — with automatic total calculation.

🚀 Features

✅ Add, Update, Delete expenses (Full CRUD)
✅ Categorize expenses (e.g., Food, Travel, Bills, etc.)
✅ Filter by category and month
✅ Sort by date or amount (ascending/descending)
✅ Real-time total calculation
✅ Responsive and clean UI
✅ Fully connected Django REST API backend

🏗️ Project Structure
expense-tracker/
│
├── backend/
│   ├── expense_project/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── app/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── migrations/
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── ...

⚙️ Backend Setup (Django)
1️⃣ Create a virtual environment
python -m venv venv
venv\Scripts\activate      # (Windows)
source venv/bin/activate   # (Mac/Linux)

2️⃣ Install dependencies
pip install django djangorestframework corsheaders

3️⃣ Create the Django project
django-admin startproject expense_project
cd expense_project
python manage.py startapp app

4️⃣ Add to INSTALLED_APPS in settings.py
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
    'app',
]

5️⃣ Enable CORS
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]
CORS_ALLOW_ALL_ORIGINS = True

6️⃣ Create Models (app/models.py)
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Expense(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)

7️⃣ Create serializers and views

Add serializers.py, views.py, and urls.py (standard DRF setup).

8️⃣ Run migrations
python manage.py makemigrations
python manage.py migrate

9️⃣ Run backend server
python manage.py runserver


Backend will be live at → http://127.0.0.1:8000/

API endpoints:

/api/categories/

/api/expenses/

💻 Frontend Setup (React)
1️⃣ Create React app
npx create-react-app frontend
cd frontend
npm install axios

2️⃣ Replace files

Put your React code in src/App.jsx

Add the styles to src/App.css

3️⃣ Start the frontend
npm start


Frontend will be live at → http://localhost:3000/

🔗 Connect React with Django

Make sure both servers are running:

Django → http://127.0.0.1:8000

React → http://localhost:3000

All API requests in React (axios) use:

const API_URL = "http://127.0.0.1:8000/api/";

📊 API Endpoints
Method	Endpoint	Description
GET	/api/categories/	List all categories
POST	/api/categories/	Create new category
GET	/api/expenses/	List all expenses
POST	/api/expenses/	Add new expense
PUT	/api/expenses/{id}/	Update expense
DELETE	/api/expenses/{id}/	Delete expense
🧠 Tech Stack

Frontend: React (Hooks, Axios, CSS)
Backend: Django REST Framework
Database: SQLite (default, easy for dev)
Styling: CSS Flexbox, Responsive Layout
Data Flow: Axios API → Django REST → SQLite

🧾 Example Features Preview
Feature	Description
Add Expense	Choose category, enter description, amount
Update	Edit expense inline
Delete	Remove expense
Filter	By category or month
Sort	By amount or date
Total	Sum of all filtered expenses



🧱 Future Improvements

✅ User authentication (login/signup)

📈 Expense chart visualization

📤 Export as CSV or Excel

💾 Persistent local storage sync

🌙 Dark/Light theme toggle



🧑‍💻 Author-Rahman Sk


🪄 License

This project is licensed under the MIT License – feel free to use and modify it!
