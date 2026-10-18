import User from '../models/user-model.js';
import genToken from '../config/token.js';
import jwt from 'jsonwebtoken';

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    let name = req.body.name;
    let email = req.body.email;

    // Decode and verify Firebase ID token if present
    if (idToken) {
      try {
        const decoded = jwt.decode(idToken);
        if (decoded && decoded.email) {
          if (decoded.exp && decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: "Firebase token has expired" });
          }
          email = decoded.email;
          name = decoded.name || name || email.split("@")[0];
        }
      } catch (err) {
        console.warn("Could not decode Firebase token, using body credentials:", err);
      }
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email
      });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: `Google auth error: ${error.message || error}`
    });
  }
};

export const logOut = async (_req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {

    return res.status(500).json({
      message: `Logout error ${error}`
    });

  }
};