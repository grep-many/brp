import User from "../models/user.model.js";

/**
 * @desc   Register a new user
 * @route  POST /api/users/signup
 * @access Public
 */
export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        const userExist = await User.exists({ email })
        if (userExist) {
            return res.status(400).json({
                message: "Email already exists!"
            })
        }

        const user = await User.create({ name, email, password })

        if (!user) {
            return res.status(400).json({
                message: "Failed to create user!"
            })
        }

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: user.generateAuthToken(),
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" })
    }
}

/**
 * @desc   Authenticate user
 * @route  POST /api/users/signin
 * @access Public
 */
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        const user = await User.findOne({ email }).select("+password")
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                message: "Invalid email or password!"
            })
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: user.generateAuthToken(),
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" })
    }
}

/**
 * @desc   Get logged-in user profile
 * @route  GET /api/users/profile
 * @access Private
 */
export const getUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user?._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error!" });
    }
};