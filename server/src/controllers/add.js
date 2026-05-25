import path from "path";
import fs from "fs";

export const addRepo = async (filePath) => {
  const repoPath = path.resolve(process.cwd(), ".reposphere");
  const staggingPath = path.join(repoPath, "stagging");

  try {
    await fs.promises.mkdir(staggingPath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.promises.copyFile(filePath, path.join(staggingPath, fileName));
    console.log(`File ${fileName} added to stagging area.`);
  } catch (error) {
    console.error("Error while adding file : ", error.message);
  }
};
