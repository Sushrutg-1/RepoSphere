import mongoose from "mongoose";
import RepositorySchema from "../schemas/repo.schema.js";
import "./issue.model.js";

const Repository = mongoose.model("Repository", RepositorySchema);

export default Repository;
