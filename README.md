BookIt
BookIt is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to browse travel experiences, view detailed availability, confirm bookings, and complete checkout.

Features:-

✅ Frontend (React + Tailwind CSS)
Browse and search experiences
View detailed descriptions, dates, and available time slots
Select date, time, and quantity
Calculate subtotal, tax, and total
Checkout page with promo code and form validation
Booking confirmation page with reference ID

✅ Backend (Node.js + Express + MongoDB)
REST API for fetching experiences
Store bookings in MongoDB
Generate reference IDs for confirmed bookings
CORS enabled for communication

Installation & Setup:- 
1️⃣ Clone the repository
git clone https://github.com/yourusername/bookit.git cd bookit

2️⃣ Setup the backend
cd backend
npm install Create a .env file
MONGO_URI=mongodb://localhost:27017/bookitdb
PORT=5000 
Run the backend at http://localhost:5000 npm start

3️⃣ Setup the frontend 
cd ../frontend 
npm install
Run the frontend at http://localhost:5173 
npm run dev

Technologies Used:- 
Frontend React 18 React Router Axios Tailwind CSS Lucide Icons
Backend Node.js Express.js MongoDB + Mongoose CORS dotenv

Future Enhancements:- ✅ User authentication & profile ✅ Payment Gateway -> with Stripe/PayPal integration ✅ Email confirmation -> with nodemailer ✅ Admin CRUD for experiences
