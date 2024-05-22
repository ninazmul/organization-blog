import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId && !req.user.isAdmin) {
    return next(errorHandler(403, "You're not allowed to update this user!"));
  }

  const {
    password,
    username,
    email,
    number,
    age,
    bloodGroup,
    address,
    education,
    facebook,
    linkedIn,
    website,
    sdg,
    profilePicture,
  } = req.body;

  if (password) {
    if (password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters!"));
    }
    req.body.password = bcryptjs.hashSync(password, 10);
  }

  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters!")
      );
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces!"));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase!"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers!")
      );
    }
  }

  if (email && !/\S+@\S+\.\S+/.test(email)) {
    return next(errorHandler(400, "Invalid email format!"));
  }

  if (number && !/^\d+$/.test(number)) {
    return next(errorHandler(400, "Phone number can only contain digits!"));
  }

  if (age && (!Number.isInteger(Number(age)) || age <= 0)) {
    return next(errorHandler(400, "Age must be a positive integer!"));
  }

  if (bloodGroup && !/^(A|B|AB|O)[+-]$/.test(bloodGroup)) {
    return next(errorHandler(400, "Invalid blood group format!"));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You're not allowed to delete this user!"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out!");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You're not allowed to see all users!"));
  }
  try {
    const startIndx = parseInt(req.query.startIndx) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndx)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res
      .status(200)
      .json({ users: usersWithoutPassword, totalUsers, lastMonthUsers });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getCommittee = async (req, res, next) => {
  try {
    const designationToExclude = "General Member";
    const designationOrder = [
      "President",
      "Vice President",
      "General Secretary",
      "Joint General Secretary",
      "Organizing Secretary",
      "Treasurer",
      "Public Relation Secretary",
      "Executive Member",
    ];

    const users = await User.find({
      designation: { $ne: designationToExclude },
      isVolunteer: true,
    });

    users.sort((a, b) => {
      return (
        designationOrder.indexOf(a.designation) -
        designationOrder.indexOf(b.designation)
      );
    });

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

