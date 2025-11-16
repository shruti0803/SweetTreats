Here’s a comprehensive `README.md` template for your **Sweet Treats** project that includes all the required sections, including the mandatory **My AI Usage** section:

````markdown
# 🍬 Sweet Treats

Sweet Treats is a full-stack e-commerce application for ordering sweets online. It includes user authentication, product management, order placement, and admin functionalities such as restocking sweets and managing reviews. The project features a modern UI built with React and Tailwind, a Node.js + Express backend, and MongoDB as the database.

---

## 🌟 Features

- User login and registration
- Browse sweets by category
- Add items to cart and place orders
- Admin panel for managing sweets, orders, and reviews
- Prescription upload for restricted items
- Responsive design for desktop and mobile

---

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS, Axios, React Router
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT + Cookies
- **Deployment:** Render / Netlify (optional)

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js >= 18
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/shruti0803/SweetTreats
cd sweet-treats/backend
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb+srv://shruti:shrutichaurasia@cluster0.02bj2je.mongodb.net/?appName=Cluster0
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```



3. Start the frontend:

```bash
npm start
```

The frontend will run on `http://localhost:5173`.

---

## 🖼 Screenshots

### Home Page

![Home Page](screenshots/home.png)
![Home Page 2](screenshots/home2.png)
![alt text](image-1.png)
![alt text](image-2.png)
### Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

### Product Detail / Cart

![alt text](image.png)

---

## 🧪 Test Report

All backend and frontend functionalities are covered with unit and integration tests.

**Backend Test Example:**

```


All backend endpoints were manually tested and returned expected responses.

| Endpoint               | Method | Test Case                         | Result |
|------------------------|--------|----------------------------------|--------|
| /api/users/register    | POST   | Register new user                 | ✅ Passed |
| /api/users/login       | POST   | Login with valid credentials      | ✅ Passed |
| /api/admin/register    | POST   | Admin Register                    | ✅ Passed |
| /api/admin/login       | POST   | Login Admin                       | ✅ Passed |
| /api/sweets/:id        | GET    | Get sweet details                 | ✅ Passed |
| /api/getAllsweets      | GET    | Get all sweets                    | ✅ Passed |
| /api/sweets            | POST   | Add new sweets                    | ✅ Passed |
| /api/sweets/:id        | PATCH  | Update sweet status               | ✅ Passed |
| /api/sweets/:id        | DELETE | Delete sweet                      | ✅ Passed |
| /api/sweets/:id/restock | POST  | Update sweet stock                | ✅ Passed |
| /api/sweets/search      | GET   | Get sweets                        | ✅ Passed |

```

**Frontend Test Example:**

* Adding to cart updates the state ✅
* Login form validation works ✅
* Admin restock modal submits successfully ✅



---

## 🚀 Live Deployment (Optional)

Try the live version 
Frontend : https://cheerful-arithmetic-9ef9e3.netlify.app/
Backend : https://sweettreats-3.onrender.com

---

## 🤖 My AI Usage

During development of Sweet Treats, I leveraged AI tools to accelerate my workflow:

1. **ChatGPT (OpenAI GPT-5 Mini)**

   * Generated boilerplate code for React components and Express routes.
   * Helped debug API issues and CORS configuration.
   * Assisted with Tailwind styling for responsive UI and modals.



3. **Gemini**

   * Used  API endpoint structures and error handling strategies.
   * Assisted in generating test cases for the backend.

**Reflection:**
AI tools significantly reduced repetitive boilerplate coding and helped clarify complex logic, particularly in API integration and UI component styling. I ensured that all generated code was thoroughly reviewed and customized to fit project requirements. Using AI responsibly helped me save time while maintaining code quality and readability.

---

## 📂 Repository Link

[GitHub - Sweet Treats] (https://github.com/shruti0803/SweetTreats)

---

## 📝 Notes

* All sensitive credentials (like MongoDB URI and JWT secret) are stored in `.env`.


---

**Prepared by:** Shruti Chaurasia 
**Date:** 2025-11-16


```
