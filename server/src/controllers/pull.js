import path from "path";
import fs from "fs";
import storage from "../config/supabse.config.js";

export const pullRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".reposphere");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // lists of all commit folders (folder name = commit ID)
    const { data: commitFolders, error } = await storage
      .from("reposphere")
      .list("commits");

    if (error) {
      console.log("Error while getting commit folder : ", error.message);
    }

    for (const folder of commitFolders) {
      const commitId = folder.name;

      //lists of  all files inside each commit folder
      const { data: files, error } = await storage
        .from("reposphere")
        .list(`commits/${commitId}`);

      if (error) {
        console.log("Error while getting folder : ", error.message);
      }

      for (const file of files) {
        const filePath = `commits/${commitId}/${file.name}`;

        //for downloading each file from one folder at a time
        const { data: fileData, error } = await storage
          .from("reposphere")
          .download(filePath);

        if (error) {
          console.log("Error while downloading files : ", error.message);
        }

        //converting blob data into binary
        const buffer = Buffer.from(await fileData.arrayBuffer());

        //local path for downloading file
        const commitDir = path.join(commitsPath, commitId);
        await fs.promises.mkdir(commitDir, { recursive: true });
        await fs.promises.writeFile(path.join(commitDir, file.name), buffer);
      }
    }

    console.log("All commits pulled successfully.");
  } catch (error) {
    console.error("Error while pulling commit from cloud : ", error.message);
  }
};
