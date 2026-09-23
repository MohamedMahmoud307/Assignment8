const User = require("../models/user.model");
const Note = require("../models/note.model");

// Signup
const signup = async (req, res) => {
    try {
        const { name, email, password, phone, age } = req.body;

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            age
        });

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user || user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Error during login",
            error: error.message
        });
    }
};


// Update User
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const { name, email, phone, age, password } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (password !== undefined) {
            return res.status(400).json({
                message: "Password cannot be updated"
            });
        }

        if (email && email.toLowerCase() !== user.email) {
            const emailExists = await User.findOne({
                email: email.toLowerCase()
            });

            if (emailExists) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

            user.email = email.toLowerCase();
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        if (age !== undefined) {
            user.age = age;
        }

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};


// Delete User
const deleteUser = async (req, res) => {
    try {
        const userId = req.query.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await Note.deleteMany({
            userId
        });

        await User.findByIdAndDelete(userId);

        res.status(200).json({
            message: "User and his notes deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};


// Get User
const getUser = async (req, res) => {
    try {
        const userId = req.query.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User found successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Error getting user",
            error: error.message
        });
    }
};


module.exports = {
    signup,
    login,
    updateUser,
    deleteUser,
    getUser
};