# AI Travel Product Management System — Frontend

A React-based frontend for the AI Travel Product Management System.

The application provides a professional interface for managing travel products, generating product content using AI, searching products using natural language, and viewing dashboard statistics.

---

## Tech Stack

* **React**
* **Vite**
* **JavaScript**
* **Tailwind CSS**
* **Axios**
* **React Router**
* **Laravel REST API**
* **OpenAI-powered backend services**

---

## Features

### Authentication

* User registration
* User login
* Logout
* Protected application routes
* Persistent authentication using browser local storage

### Dashboard

Displays:

* Total products
* Active products
* Expired products
* Quick access to AI features

### Product Management

Users can:

* View products
* Create products
* View product details
* Edit products
* Delete products

The product interface includes:

* Destination
* Category
* Description
* Highlights
* Inclusions
* Tags
* Price
* Inventory
* Validity dates
* Active / inactive status

### AI Product Generator

Users can describe a travel product in natural language.

The frontend sends the request to the Laravel backend, which uses OpenAI to generate:

* Product name
* Destination
* Category
* Description
* Highlights
* Inclusions
* Tags

The generated information is displayed for review before saving.

### AI Search

Users can search products using natural language, for example:

```text
Show active family packages in Colombo
```

or:

```text
Show products below LKR 10000
```

The Laravel backend interprets the request using OpenAI and returns the matching products.

### Responsive UI

The application is designed to work across:

* Desktop
* Tablet
* Mobile

---

## Project Structure

```text
src/
├── components/
│   ├── Common/
│   ├── Dashboard/
│   ├── Layout/
│   ├── Products/
│   └── AI/
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── CreateProduct.jsx
│   ├── EditProduct.jsx
│   ├── ProductDetails.jsx
│   ├── AIProductGenerator.jsx
│   └── AISearch.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

### 1. Clone the repository

```bash
git clone <https://github.com/manooabi/AI-Travel-Product-Management-System---Frontend.git>
cd AI-Travel-Product-Management-System---Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000/api
```

The Laravel backend must be running before using the application.

### 4. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Backend

The frontend communicates with the Laravel backend through REST APIs.

Backend API:

```text
http://localhost:8000/api
```

The backend repository contains the API implementation, database migrations, authentication, business logic and OpenAI integration.

---

## Authentication

Authentication is handled by Laravel Sanctum.

After successful login or registration, the frontend stores the returned authentication token and automatically attaches it to API requests.

Authenticated requests use:

```text
Authorization: Bearer <token>
```

Protected frontend routes redirect unauthenticated users to the login page.

---

## AI Workflow

### AI Product Generation

```text
User prompt
    ↓
React frontend
    ↓
Laravel API
    ↓
OpenAI
    ↓
Structured product data
    ↓
React review form
    ↓
Laravel Product API
    ↓
MySQL
```

### AI Search

```text
Natural-language query
    ↓
React frontend
    ↓
Laravel API
    ↓
OpenAI interprets intent
    ↓
Structured filters
    ↓
Laravel applies database filters
    ↓
MySQL
    ↓
Search results
    ↓
React frontend
```

---

## Environment Variables

The project uses:

```env
VITE_API_URL=http://localhost:8000/api
```

Do not commit environment files containing environment-specific secrets.

An `.env.example` file is included as a configuration template.

---

## Assessment Features

The frontend implements the major application requirements:

* Authentication
* Product CRUD
* Product listing
* Product details
* Product editing
* Product deletion
* Dashboard statistics
* AI product generation
* AI natural-language search
* Expired product handling
* Responsive professional UI
* Loading, error and empty states

---

## Related Repository

The Laravel backend is maintained in a separate repository.


```text
<https://github.com/manooabi/AI-Travel-Product-Management-System---Backend.git>
```
