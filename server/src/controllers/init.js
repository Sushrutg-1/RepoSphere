import fs from "fs";
import path from "path";

const S3_BUCKET = process.env.S3_BUCKET;

export const initRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".reposphere");
  const commitPath = path.join(repoPath, "commits");

  try {
    await fs.promises.mkdir(repoPath, { recursive: true });
    await fs.promises.mkdir(commitPath, { recursive: true });
    await fs.promises.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: S3_BUCKET }),
    );
    console.log("Repository initialised succefully");
  } catch (error) {
    console.log(error);
    console.error("Error Initialising Repository : ", error.message);
  }
};
