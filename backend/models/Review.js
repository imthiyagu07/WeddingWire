import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    providerId: {type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true},
    rating: {type: Number, required: true, min: 1, max: 5},
    comment: {type: String, required: true},
}, {timestamps: true});

reviewSchema.index({customerId: 1, providerId: 1}, {unique: true});

const Review = mongoose.model('Review', reviewSchema);

export default Review;