import fs from "fs";
import path from "path";
import util from "util";

const readDir = util.promisify(fs.readdir);
const copyFile = util.promisify(fs.copyFile);

export const revertRepo = async (commitId) => {
  const repoPath = path.resolve(process.cwd(), ".reposphere");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitsPath, commitId);
    const files = await readDir(commitDir);
    const parentPath = path.join(repoPath, "..");

    for (const file of files) {
      await copyFile(path.join(commitDir, file), path.join(parentPath, file));
    }

    console.log(`Commit ${commitId} reverted successfully!`);
  } catch (error) {
    console.error("Error while reverting commit : ", error.message);
  }
};
