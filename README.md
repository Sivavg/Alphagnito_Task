# Solace CRM Project (Alphagnito Technical Task)

This is a full-stack CRM web application built perfectly based on the provided design. It includes a complete authentication system and Agent Dashboard with CRUD functionality.

## 🚀 Tech Stack
- **Frontend**: React.js, Vite, Bootstrap 5, Custom CSS Variables
- **Backend**: Node.js, Express.js
- **Database**: MySQL, Sequelize ORM
- **Additional**: JWT (Authentication), Bcrypt (Password hashing)

## 🎨 UI / UX Implementation
- **Design match**: Accurate implementation of Figma design, including custom colors, Inter font typography, icons, and layout structure.
- **Responsiveness**: fully responsive design adapting to desktops, tablets, and mobiles.
- **Animations/Experience**: Smooth transitions and hover effects making it highly professional and premium.

## 🛠 Project Setup

### 1. Database Setup
Make sure you have MySQL installed and running on your local machine.

### 2. Backend Setup
```bash
cd server
npm install
```
Configure `.env` file inside `/server`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
# Put your MySQL root password below:
DB_PASSWORD=
DB_NAME=solace_crm
JWT_SECRET=supersecretkey_for_solace_crm_auth
```

Run database sync and start backend script:
```bash
node setupDb.js
npm run start # (or just 'node server.js')
```
*(setupDb.js automatically creates the `solace_crm` database if it doesn't exist)*

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open the provided Vite localhost link (usually http://localhost:5173).

## 📡 API Endpoints List
- `POST /api/auth/register` : Register user
- `POST /api/auth/login` : Login user
- `GET /api/agents` : Get all agents (Protected)
- `POST /api/agents` : Create an agent (Protected)
- `PUT /api/agents/:id` : Update an agent (Protected)
- `DELETE /api/agents/:id` : Delete an agent (Protected)
