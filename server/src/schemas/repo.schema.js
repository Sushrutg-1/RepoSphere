import mongoose from "mongoose";

const RepositorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },

  content: [
    {
      type: String,
      default: [],
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  visibility: {
    type: Boolean,
  },
  issues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      default: [],
    },
  ],
});

export default RepositorySchema;
