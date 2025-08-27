# 🚀 Crop, Farm, Technician and Sensor Management System

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Sequeliz [e](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white)](https://sequelize.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

---

## 📌 System Description

This system allows you to manage crops, farms, technicians, and sensors, as well as record and query transactions and agricultural data.

It includes a REST API developed in Node.js and Express, and a web interface (frontend) where each entity has its own view and full CRUD, communicating directly with the API.

### Main Features

- CRUD for crops, farms, technicians, and sensors.
- Bulk data upload from CSV/Excel files.
- Advanced queries and agricultural reports.
- Each table has its own view in the frontend, allowing visual management and direct communication with the API.

**Technologies:** Node.js, Express, Sequelize, MySQL, HTML, Bootstrap 5, JavaScript.

---

## 🛠 Technologies used

| Area | Technology |
|---------------|--------------------------|
| Backend | Node.js, Express |
| ORM | Sequelize |
| Database | MySQL |
| Frontend | HTML, Bootstrap 5, JS |
| File upload | Multer, XLSX |
| Other | dotenv, CORS |

---

## ⚙ Instructions for running the project

1. Clone the repository:
```bash
git clone <repo-url>
cd <repo>
```
2. Install the dependencies:
```bash
npm install
```
3. Configure the environment variables in `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=PruebaJuanMalecon
DB_PORT=3306
PORT=3000
```
4. Run the database and sync the models:
```bash
node app/index.js
```
5. Log in:
[http://localhost:3000](http://localhost:3000)

---

## 🖥️ Frontend

The system has a web interface where each entity (crops, farms, technicians, sensors) has its own view and complete CRUD.
Each view communicates with the API via HTTP requests (fetch), allowing visual and real-time data management.

- `/src/Pages` folder: Contains the HTML views for each entity.
- `/src/Js` folder: Contains the JS scripts for each CRUD and the integration with the API.

---

## 📥 Bulk Upload from CSV/Excel

- **Endpoint:** `/api/csv/uploadExcel`
- **Method:** POST
- **Format:** CSV/Excel with columns:
- ID Number
- Customer Name
- Address
- Phone Number
- Email Address
- Platform Used
- Transaction Type
- Transaction Status
- Transaction Date and Time
- Transaction Amount
- Amount Paid

The system automatically creates records in the corresponding tables.
The operation is performed in a Sequelize transaction to ensure consistency.

**Example with Postman:**
```http
POST /api/csv/uploadExcel
Content-Type: multipart/form-data
File: clientes_transacciones.csv
```

---

## 👤 Developer Details

- **Name:** Juan Guzman
- **Clan/Group:** Malecon
- **Email:** juanguzman10102005@gmail.com

---

## 🔗 Badges and Resources

Node.js
Sequelize
MySQL
Bootstrap