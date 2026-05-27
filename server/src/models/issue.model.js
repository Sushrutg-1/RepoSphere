import mongoose from "mongoose";
import IssueSchema from "../schemas/issue.schema.js";

const Issue = new mongoose.model("Issue", IssueSchema);

export default Issue;
