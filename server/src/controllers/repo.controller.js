import User from "../models/user.model.js";
import Repository from "../models/repo.model.js";
import mongoose from "mongoose";

export const createRepo = async (req, res) => {
  try {
    const { userId, name, description, visibility } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const repository = await Repository.create({
      name,
      description,
      owner: userId,
      visibility,
    });

    return res.status(200).json({
      success: true,
      message: "New repository created successfully",
      repository,
    });
  } catch (error) {
    console.error("Error while creating repository : ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllRepos = async (req, res) => {
  try {
    const allRepositories = await Repository.find({})
      .populate("owner")
      .populate("issues");
    if (allRepositories === 0) {
      return res
        .status(400)
        .json({ success: false, message: "There is no repositories" });
    }
    return res.status(200).json({
      success: true,
      message: "fetching all repositories successfully",
      allRepositories,
    });
  } catch (error) {
    console.error("Error while fetching all repositories : ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRepoByName = async (req, res) => {
  try {
    const { name } = req.params;

    const repository = await Repository.findOne({ name: name })
      .populate("owner")
      .populate("issues");
    if (!repository) {
      return res.status(400).json({
        success: false,
        message: "No repository found with this name.",
      });
    }
    return res.status(200).json({
      message: "Successfully fetched repository by name",
      success: true,
      repository,
    });
  } catch (error) {
    console.error("Error while geting repository by name : ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// All repositories of a user
export const getReposByUserId = async (req, res) => {
  try {
    const { userId } = req.params; //Check after frontend done

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const allRepositories = await Repository.find({ owner: user._id }).populate(
      "issues",
    );

    return res.status(200).json({
      message: "Successfully fetched repository userId ",
      success: true,
      user,
      allRepositories,
    });
  } catch (error) {
    console.error("Error while geting repository of user : ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRepoById = async (req, res) => {
  try {
    const { id: repoId } = req.params;

    const repository = await Repository.findById(repoId)
      .populate("owner")
      .populate("issues");
    if (!repository) {
      return res.status(400).json({
        success: false,
        message: "No repository found with this Id.",
      });
    }
    return res.status(200).json({
      message: "Successfully fetched repository by Id",
      success: true,
      repository,
    });
  } catch (error) {
    console.error("Error while geting repository by Id : ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRepo = async (req, res) => {
  try {
    const { id: repoId } = req.params;
    const {
      name: newName,
      content: newContent,
      description: newDescription,
    } = req.body;

    let repository = await Repository.findById(repoId);

    if (!repository) {
      return res.status(400).json({
        success: false,
        message: "No repository found",
      });
    }

    repository.name = newName;
    repository.description = newDescription;
    repository.content.push(newContent);

    const resultRepo = await repository.save();

    return res.status(200).json({
      message: "Repository updated Successfully",
      success: true,
      repository: resultRepo,
    });
  } catch (error) {
    console.error("Error while updating repository : ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRepo = async (req, res) => {
  try {
    const { id: repoId } = req.params;

    let repository = await Repository.findById(repoId);

    if (!repository) {
      return res.status(400).json({
        success: false,
        message: "No repository found",
      });
    }

    await repository.deleteOne();

    return res.status(200).json({
      message: " Repository deleted successfully ",
      success: true,
    });
  } catch (error) {
    console.error("Error while deleting repository : ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggeleRepoVisibility = async (req, res) => {
  try {
    const { id: repoId } = req.params;

    let repository = await Repository.findById(repoId);

    if (!repository) {
      return res.status(400).json({
        success: false,
        message: "No repository found",
      });
    }

    repository.visibility = !repository.visibility;

    const resultRepo = await repository.save();

    return res.status(200).json({
      message: "Repository visibility updated",
      success: true,
      repository: resultRepo,
    });
  } catch (error) {
    console.error(
      "Error while updating visibility of repository : ",
      error.message,
    );
    return res.status(500).json({ success: false, message: error.message });
  }
};
