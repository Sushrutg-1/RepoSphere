import mongoose from "mongoose";
import UserSchema from "../schemas/user.schema.js";

const User = new mongoose.model("User", UserSchema);

export default User;
