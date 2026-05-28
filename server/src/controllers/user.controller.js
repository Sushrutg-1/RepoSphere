import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required." });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ message: "Username already exists.", success: false });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ messgae: "Email already exists.", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User registered successfully.",
      token: token,
      userId: user._id,
      success: true,
    });
  } catch (error) {
    console.error("Error while registering user : ", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password invalid. Please try again.",
      });
    }

    const token = await jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      message: "Login successfull.",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error while login : ", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({}).select("-password");
    return res.status(200).json({
      success: true,
      message: "All user fetched successfull.",
      allUser,
    });
  } catch (error) {
    console.error("Error while geting all user : ", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getUserProfileById = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findById(userId)
      .select("-password")
      .populate("repositories");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res
      .status(200)
      .json({ success: true, message: "User fetched successfully.", user });
  } catch (error) {
    console.error("Error while geting user by id : ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { email: newEmail, username: newUsername, password } = req.body;
    let isUpdated = false;

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password required", success: false });
    }

    if (!newUsername && !newEmail) {
      return res.status(400).json({
        message: "Username or Email must required!",
        success: false,
      });
    }

    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password invalid. Please try again.",
      });
    }

    if (newEmail && newEmail !== user.email) {
      const existingEmail = await User.findOne({ email: newEmail });
      if (existingEmail) {
        return res
          .status(400)
          .json({ success: false, message: "Email is already exists." });
      }
      user.email = newEmail;
      isUpdated = true;
    }

    if (newUsername && newUsername !== user.username) {
      const existingUsername = await User.findOne({ username: newUsername });
      if (existingUsername) {
        return res
          .status(400)
          .json({ success: false, message: "Username is already exists." });
      }
      user.username = newUsername;
      isUpdated = true;
    }

    if (!isUpdated) {
      await user.save();
      return res.status(200).json({
        success: true,
        message: "No changes detects",
        user,
      });
    }

    await user.save();
    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error while updating user details : ", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res
        .status(400)
        .json({ message: "User not found.", success: false });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.error("Error while deleting user. : ", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
