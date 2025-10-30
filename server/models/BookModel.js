const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    experienceId: { type: Number, required: true },
    experienceTitle: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    promoCode: { type: String, default: null },
    refId: {type: String},
    createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Booking', bookSchema);