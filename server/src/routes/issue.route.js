import express, { Router } from "express";
import {
  createIssue,
  deleteIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
} from "../controllers/issue.controller.js";

const router = Router();

router.get("/", getAllIssues);
router.post("/", createIssue);
router.get("/:id", getIssueById);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export default router;
