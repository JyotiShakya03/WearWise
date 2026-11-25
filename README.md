# WearWise – AI-Powered E-Commerce Platform with Virtual Try-On

WearWise is an AI-powered fashion e-commerce web application that allows users to explore clothing products, manage their shopping activities, and virtually try on garments using artificial intelligence.

The platform combines a modern e-commerce experience with an AI-based Virtual Try-On feature to help customers visualise how selected garments may look on them before making a purchase.

## Key Features

### Customer Features
- User registration and secure login using JWT authentication.
- Browse and explore fashion products.
- Add products to cart and manage quantities.
- Add or remove products from wishlist.
- Place orders and view order history.
- Cancel eligible orders.
- AI-powered Virtual Try-On functionality.
- Upload personal and garment images for virtual try-on.
- Preview and download generated try-on images.

### Admin Features
- Admin authentication and protected dashboard.
- Add, update and delete products.
- View and manage customer orders.
- Update order statuses.
- View customer information.
- Monitor dashboard statistics and revenue.

### AI Virtual Try-On
- Uses FASHN VTON 1.5 for AI-based garment transfer.
- Supports person and garment image uploads.
- Supports JPG, PNG and WEBP image formats.
- Includes image validation and upload-size restrictions.
- Uses a FastAPI-based AI service connected to the Node.js backend.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React.js, Vite, HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Token (JWT), bcryptjs |
| AI Model | FASHN VTON 1.5 |
| AI Service | Python, FastAPI |
| Image Processing | Multer, File Type Validation |
| AI Hosting | Kaggle GPU, ngrok |

## Project Architecture

The application consists of three main components:

1. **Frontend:** React-based user interface for customers and administrators.
2. **Backend:** Node.js and Express.js REST API responsible for authentication, products, cart, wishlist and order management.
3. **AI Service:** Python FastAPI service that processes images and generates virtual try-on results using the FASHN VTON 1.5 model.

The frontend communicates with the backend, while the backend communicates with the AI service when a virtual try-on request is submitted.

## Project Structure

```text
WearWise/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── server/
│   ├── ai-service/
│   │   └── app.py
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
├── index.html
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js and npm
- MongoDB Atlas account or MongoDB connection
- Python environment for the AI service
- Access to the FASHN VTON 1.5 model and its required weights

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/WearWise.git
cd WearWise
```

### 2. Install Frontend Dependencies

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

Configure the required environment variables in `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=your_ai_service_url
WEARWISE_API_KEY=your_ai_service_api_key
```

Start the backend:

```bash
node server.js
```

### 4. AI Service Setup

The AI service is built using Python and FastAPI and uses the FASHN VTON 1.5 model.

To run the AI service independently, configure the required Python dependencies, model repository and model weights, then start the FastAPI application using the appropriate environment configuration.

The AI service requires compatible GPU resources for model inference.

## Security Features

- JWT-based authentication.
- Password hashing using bcryptjs.
- Protected customer and admin routes.
- Role-based access control.
- Request rate limiting.
- Secure HTTP headers using Helmet.
- CORS configuration.
- Image file type validation.
- File upload size restrictions.
- Server-side product and order validation.

## Project Objective

The primary objective of WearWise is to enhance the online fashion shopping experience by integrating artificial intelligence with conventional e-commerce functionality.

The project demonstrates the practical application of full-stack web development, database management, API integration, authentication, security practices and AI-based image processing.

## Academic Project

**Project Name:** WearWise – AI-Powered E-Commerce Platform with Virtual Try-On

**Project Type:** MCA Major Project

**Developer:** Jyoti Shakya

---

*This project is developed for academic and learning purposes.*