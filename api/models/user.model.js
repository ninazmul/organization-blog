import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://i.ibb.co/NjvDZcY/user-7993222.png",
    },
    number: {
      type: String,
      required: true,
      default: "",
    },
    age: {
      type: Number,
      required: true,
      default: null,
    },
    bloodGroup: {
      type: String,
      required: true,
      default: "",
    },
    address: {
      type: String,
      required: true,
      default: "",
    },
    education: {
      type: String,
      required: true,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    sdg: {
      type: String,
      required: true,
      default: "",
    },
    designation: {
      type: String,
      default: "General Member",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVolunteer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
