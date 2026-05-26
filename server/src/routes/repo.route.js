import express, { Router } from "express";
import {
  createRepo,
  deleteRepo,
  getAllRepos,
  getRepoById,
  getRepoByName,
  getRepoByUserId,
  toggeleRepoVisibility,
  updateRepo,
} from "../controllers/repo.controller.js";

const router = Router();

router.post("/", createRepo);
router.get("/", getAllRepos);
router.get("/name/:name", getRepoByName);
router.get("/user/:id", getRepoByUserId);
router.get("/:id", getRepoById);
router.put("/:id", updateRepo);
router.delete("/:id", deleteRepo);
router.patch("/visibility/:id", toggeleRepoVisibility);

export default router;
