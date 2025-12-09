import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    providerId: {type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true},
    serviceType: {type: String, required: true},
    eventDate: {type: Date, required: true},
    guestCount: Number,
    message: String,
    status: {type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending'},
    budget: Number,
}, {timestamps: true});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;