import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    businessName: {type: String, required: true},
    category: {type: String, required: true, enum: ['Venue', 'Catering', 'Photography', 'Decoration', 'Beauty', 'Fashion', 'Printing', 'Entertainment', 'Transportation']},
    description: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zipCode: {type: String, required: true},
    services: [String],
    priceRange: {
        min: {type: Number, required: true},
        max: {type: Number, required: true},
        currency: {type: String, required: true, enum: ['USD', 'EUR', 'INR'], default: 'INR'},
    },
    images: [String],
    contactInfo: {
        phone: {type: String, required: true},
        email: {type: String, required: true},
        website: {type: String},
    },
    availability: {type: Boolean, default: true},
    rating: {type: Number, default: 0},
    reviewsCount: {type: Number, default: 0},
}, {timestamps: true});

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);

export default ServiceProvider;