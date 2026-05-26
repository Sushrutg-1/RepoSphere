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
    },
  ],

  starRepositories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
    },
  ],
  fallowedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default UserSchema;
