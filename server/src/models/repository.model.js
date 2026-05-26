import mongoose from "mongoose";
import RepositorySchema from "../schemas/repository.schema.js";

const Repository = new mongoose.model("Repository", RepositorySchema);

export default Repository;
