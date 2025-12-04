import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["customer", "provider", "admin"], default: "customer"},
    phone: String,
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;