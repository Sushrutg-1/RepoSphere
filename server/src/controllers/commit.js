import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const commitRepo = async (message) => {
  const repoPath = path.resolve(process.cwd(), ".reposphere");
  const staggingPath = path.join(repoPath, "stagging");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitId = uuidv4();
    const commitDir = path.join(commitPath, commitId);
    await fs.promises.mkdir(commitDir, { recursive: true });

    const files = await fs.promises.readdir(staggingPath);

    for (let file of files) {
      await fs.promises.copyFile(
        path.join(staggingPath, file),
        path.join(commitDir, file),
      );
    }

    await fs.promises.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message: message, Date: new Date().toISOString() }),
    );

    console.log(`Commit ${commitId} is created with message "${message}"`);
  } catch (error) {
    console.error(`Error while commiting : `, error.message);
  }
};
