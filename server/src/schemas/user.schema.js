import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  repositories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
      default: [],
    },
  ],

  starRepositories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
      default: [],
    },
  ],
  fallowedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

export default UserSchema;
