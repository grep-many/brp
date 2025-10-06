# 📚 Book Review Platform (BRP)

A **Full Stack MERN application** that allows users to register, add books, write reviews, and explore insights through ratings and analytics. Built using **MongoDB, Express.js, React, and Node.js**.

---

## 🚀 Features

- 🔐 Secure user authentication using JWT
- 📘 CRUD operations for books and reviews
- ⭐ Ratings & Review analytics
- 🌗 Light/Dark theme support
- 🧩 Modular React components with Context API
- ⚙️ RESTful API with Express.js backend
- 🛡️ Protected routes with middleware
- 🧠 Clean, maintainable folder structure

---

## 🧰 Tech Stack

**Frontend:** React, Vite, Context API, TailwindCSS, ShadCN UI  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT (JSON Web Tokens)  
**Other Tools:** Axios, Bcrypt, ESLint, Sonner

---

## 🏗️ Folder Structure

```
brp/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       └── routes/
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       └── services/
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bookreview
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1d
ORIGIN=http://localhost:5173
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🧑‍💻 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/grep-many/brp.git
cd brp
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### 🧍 Authentication Routes (`/api/auth`)

| Method | Endpoint       | Description              | Auth Required |
|---------|----------------|--------------------------|---------------|
| POST    | `/register`    | Register new user        | ❌ No         |
| POST    | `/login`       | Login and get JWT token  | ❌ No         |
| GET     | `/profile`     | Get logged-in user info  | ✅ Yes        |

---

### 📚 Book Routes (`/api/books`)

| Method | Endpoint            | Description                     | Auth Required |
|---------|---------------------|---------------------------------|---------------|
| GET     | `/`                 | Get all books                   | ❌ No         |
| GET     | `/:id`              | Get single book details         | ❌ No         |
| POST    | `/`                 | Add a new book                  | ✅ Yes        |
| PUT     | `/:id`              | Update a book                   | ✅ Yes        |
| DELETE  | `/:id`              | Delete a book                   | ✅ Yes        |

---

### ⭐ Review Routes (`/api/reviews`)

| Method | Endpoint              | Description                        | Auth Required |
|---------|-----------------------|------------------------------------|---------------|
| GET     | `/book/:bookId`       | Get all reviews for a specific book| ❌ No         |
| POST    | `/book/:bookId`       | Add review for a book              | ✅ Yes        |
| PUT     | `/:reviewId`          | Update a review                    | ✅ Yes        |
| DELETE  | `/:reviewId`          | Delete a review                    | ✅ Yes        |

---

## 🧩 Project Highlights

- Context-based state management for scalability  
- Secure password hashing using bcrypt  
- Unique review constraint per user-book combination  
- Express middleware for authentication  
- Mongoose validation with timestamps  

---

## 🤝 Contributing

Contributions are welcome!  
To contribute:
1. Fork this repository  
2. Create a new branch (`git checkout -b feature-xyz`)  
3. Commit your changes (`git commit -m "Add new feature"`)  
4. Push and create a Pull Request

---

## 💡 Acknowledgements

- [React Documentation](https://react.dev)  
- [Express.js Guide](https://expressjs.com)  
- [MongoDB Manual](https://www.mongodb.com/docs)  
- [ShadCN UI](https://ui.shadcn.com)
