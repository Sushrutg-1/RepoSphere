import express, { Router } from "express";
import { deleteUserProfile, getAllUsers, getUserProfileById, loginUser, registerUser, updateUserProfile } from "../controllers/user.controller.js";

const router = Router();

//Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

//user
router.get("/", getAllUsers);
router.get("/:id", getUserProfileById);
router.put("/:id", updateUserProfile);
router.delete("/:id", deleteUserProfile);

export default router;
