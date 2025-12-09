import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({userId: id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const isUserExists = await User.findOne({email});
        if (isUserExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({name, email, password: hashedPassword});
        if (user) {
            const token = generateToken(user._id);
            if (!token) {
                return res.status(400).json({message: "Error: while generate token"});
            }
            res.cookie('jwt', token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60 * 1000
            });
            const newUser = {
                userId: user._id,
                name: user.name,
                email: user.email
            };
            res.status(201).json({message: "Registered successfully", newUser});
        }
    } catch (error) {
        console.error("Error in register controller:", error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email.trim() || !password.trim()) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = generateToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        const newUser = {
            userId: user._id,
            name: user.name,
            email: user.email
        };
        res.status(200).json({message: "Login successfully", newUser});
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0});
        res.status(200).json({message: "Logout successfully"});
    } catch (error) {
        console.error("Error in logout controller:", error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const getMe = (req, res) => {
    res.json(req.user);
}