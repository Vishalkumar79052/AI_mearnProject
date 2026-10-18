import User from '../models/user-model.js';
import genToken from '../config/token.js';
import jwt from 'jsonwebtoken';

export const googleAuth = async (req, res) => {
  try {
    const { name, email, idToken } = req.body;
    let userEmail = email;
    let userName = name;

    if (idToken) {
      try {
        const decoded = jwt.decode(idToken);
        if (decoded && decoded.email) {
          userEmail = decoded.email;
          userName = decoded.name || name || userEmail.split("@")[0];
        }
      } catch (err) {
        // Fallback to body email/name
      }
    }

    if (!userEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email: userEmail });

    if (!user) {
      user = await User.create({
        name: userName || userEmail.split("@")[0],
        email: userEmail
      });
    }

    const token = await genToken(user._id);

    const isProduction = process.env.NODE_ENV === "production" || Boolean(req.headers.host && !req.headers.host.includes("localhost"));

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: `Google auth error ${error.message || error}`
    });
  }
};

export const logOut = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production" || Boolean(req.headers.host && !req.headers.host.includes("localhost"));

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    return res.status(500).json({
      message: `Logout error ${error.message || error}`
    });
  }
};