import mongoose, { mongo } from "mongoose";

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requred: true,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  repository: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Repository",
    required: true,
  },
});

export default IssueSchema;
