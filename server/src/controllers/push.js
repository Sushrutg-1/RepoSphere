import fs from "fs";
import path from "path";
import storage from "../config/supabse.config.js";

export const pushRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".reposphere");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitsDirs = await fs.promises.readdir(commitsPath);
    for (const commitDir of commitsDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.promises.readdir(commitPath);
      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.promises.readFile(filePath);

        const { data, error } = await storage
          .from("reposphere")
          .upload(`commits/${commitDir}/${file}`, fileContent, {
            contentType: "application/octet-stream",
            upsert: true,
          });

        if (error) {
          console.log("Error in supabase  : ", error.message);
          continue;
        }
        // console.log("Uploaded Data : ", data);
      }
    }

    console.log("All commits push to cloud successfully");
  } catch (error) {
    console.error(`Error while pushing commits : ${error.message}`);
  }
};
