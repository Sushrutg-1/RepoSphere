import Issue from "../models/issue.model.js";
import Repository from "../models/repo.model.js";

export const getAllIssues = async (req, res) => {
  try {
    const allIssues = await Issue.find().populate("repository");

    return res.status(200).json({
      message: "All issues fetched successfully",
      allIssues,
      success: true,
    });
  } catch (error) {
    console.error("Error while fetching issues : ", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const createIssue = async (req, res) => {
  try {
    const { repoId, title, description, status } = req.body;

    const repository = await Repository.findById(repoId);
    if (!repository) {
      return res
        .status(400)
        .json({ message: "Repository does not exists", success: false });
    }

    const issue = await Issue.create({
      title,
      description,
      status,
      repository: repoId,
    });

    return res.status(200).json({
      message: "Issue created successfully",
      issue,
      success: true,
    });
  } catch (error) {
    console.error("Error while creating issue : ", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getIssueById = async (req, res) => {
  try {
    const { id: issueId } = req.params;

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res
        .status(400)
        .json({ message: "Issues not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Issues fetched successfully", issue, success: true });
  } catch (error) {
    console.error("Error while fetching issues : ", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateIssue = async (req, res) => {
  try {
    const { id: issueId } = req.params;
    const {
      title: newTitle,
      description: newDescription,
      status: newStatus,
    } = req.body;
    let isUpdated = false;

    if (!newDescription || !newTitle || newStatus) {
      return res
        .status(400)
        .json({ message: "All fields are requires", success: false });
    }

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res
        .status(400)
        .json({ message: "Issues not found", success: false });
    }

    if (newTitle && newTitle !== issue.title) {
      issue.title = newTitle;
      isUpdated = true;
    }
    if (newDescription && newDescription !== issue.title) {
      issue.title = newDescription;
      isUpdated = true;
    }
    if (newStatus && newStatus !== issue.title) {
      issue.title = newStatus;
      isUpdated = true;
    }

    if (isUpdated) {
      return res
        .status(200)
        .json({ message: "Issues updated successfully", issue, success: true });
    }

    await issue.save();

    return res
      .status(200)
      .json({ message: "NO updated detects", issue, success: true });
  } catch (error) {
    console.error("Error while updating issues : ", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const { id: issueId } = req.params;

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res
        .status(400)
        .json({ message: "Issues not found", success: false });
    }

    await issue.deleteOne();

    return res
      .status(200)
      .json({ message: "Issues deleted successfully", success: true });
  } catch (error) {
    console.error("Error while deleting issues : ", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};
