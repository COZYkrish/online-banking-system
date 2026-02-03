# 🏦 Online Banking System

A full-stack **Online Banking System** built using **HTML, CSS, JavaScript, Node.js, Express, and MongoDB**.  
This project demonstrates real-world banking features such as **authentication, account management, and secure data handling**.

---

## ✨ Features

### 🔐 Authentication & Security
- User Registration & Login
- Password hashing using **bcrypt**
- JWT-based authentication
- Protected routes with middleware
- Secure logout

### 🧾 Account Management
- Automatic account creation on registration
- Unique account number generation
- Initial balance credit (₹1000)
- Secure account details API

### 📊 User Dashboard
- Displays account number
- Shows real-time balance
- Protected dashboard (JWT required)
- Logout functionality

### 🛠 Backend Architecture
- RESTful APIs
- MVC-style folder structure
- MongoDB with Mongoose ODM
- Express middleware for authorization

---

## 🧰 Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## 🚀 How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/online-banking-system.git
cd online-banking-system
2️⃣ Install Backend Dependencies
cd backend
npm install
3️⃣ Start MongoDB
Make sure MongoDB is running on:

mongodb://127.0.0.1:27017
4️⃣ Start Backend Server
node server.js
Server will run on:

http://127.0.0.1:5000
5️⃣ Run Frontend
Open frontend/index.html
or use Live Server in VS Code.

🔐 Environment Variables
Create a .env file in the backend folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/banking
JWT_SECRET=your_secret_key
🧪 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/account/me	Get account details
GET	/api/account/transactions/recent	Get recent transactions
📁 Final Project Structure
online-banking-system/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Account.js
│   │   └── Transaction.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── accountRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── transfer.html
│   ├── transactions.html
│   └── admin.html
│
├── css/
│   ├── main.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── transfer.css
│   └── admin.css
│
├── js/
│   ├── auth.js
│   ├── dashboard.js
│   ├── transfer.js
│   ├── transactions.js
│   └── admin.js
│
├── .gitignore
├── README.md
└── .env

👨‍💻 Author
Krish Sharma