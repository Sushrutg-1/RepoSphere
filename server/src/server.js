import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initRepo } from "./controllers/init.js";
import { addRepo } from "./controllers/add.js";
import { commitRepo } from "./controllers/commit.js";
import { pushRepo } from "./controllers/push.js";
import { pullRepo } from "./controllers/pull.js";
import { revertRepo } from "./controllers/revert.js";
import { argv } from "process";
import { connectDB } from "./config/db.config.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT;

const startServer = () => {
  connectDB();
  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server Is Running......");
  });
};

yargs(hideBin(process.argv))
  .command("start", "Start a server!", {}, startServer)
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "file to add in stagging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    },
  )
  .command(
    "commit <message>",
    "Commit the stagged files",
    (yargs) => {
      yargs.positional("message", {
        type: "string",
        describe: "commit message",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    },
  )
  .command("push", "push commit to cloud", {}, pushRepo)
  .command("pull", "pull commit from the cloud", {}, pullRepo)
  .command(
    "revert <commitId>",
    "Revert the specific commit",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "CommiId to revert to that commit",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitId);
    },
  )
  .demandCommand(1, "You have to run atleast one command")
  .help().argv;
