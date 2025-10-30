const express = require('express');
const cors = require('cors');
const experienceRoute = require('./routes/experience');
const bookingRoute = require('./routes/booking')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5000;
// process.env.URI
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));


app.use('/api/experience', experienceRoute);
app.use('/api/bookings', bookingRoute); 

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
