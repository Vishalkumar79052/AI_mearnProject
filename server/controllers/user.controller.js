import User from "../models/user-model.js";
import jwt from "jsonwebtoken";

export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(200).json(null);
        }

        let verifyToken;
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(200).json(null);
        }

        if (!verifyToken || !verifyToken.userId) {
            return res.status(200).json(null);
        }

        const user = await User.findById(verifyToken.userId);
        if (!user) {
            return res.status(200).json(null);
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            message: `Failed to get current user: ${error.message || error}`
        });
    }
}