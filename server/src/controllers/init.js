import fs from "fs";
import path from "path";

const S3_BUCKET = process.env.S3_BUCKET;

export const initRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".reposphere");

  try {
    await fs.promises.mkdir(repoPath, { recursive: true });
    await fs.promises.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: S3_BUCKET }),
    );
    console.log("Repository initialised succefully!");
  } catch (error) {
    console.log(error);
    console.error("Error while initialising repository : ", error.message);
  }
};
