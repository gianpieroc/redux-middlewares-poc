import { Select } from "enquirer";
import fs from "fs";
import { promisify } from "util";
import chalk from "chalk";

const middlewaresPath = "./middlewares";
const readdir = promisify(fs.readdir);
const selectedValueColor = choice =>
  choice.enabled ? " " + chalk.green("●") : " " + chalk.gray("o");

const getFiles = async () => await readdir(middlewaresPath);

const selectPrompt = files =>
  new Select({
    name: "Middlewares",
    message: chalk.green.bold("Which middleware file you would like to run?"),
    choices: files,
    styles: {
      em: chalk.cyan
    },
    indicator: (_, choice) => selectedValueColor(choice)
  });

const runPrompt = async () => {
  const files = await getFiles();
  return selectPrompt(files)
    .run()
    .then(fileName => {
      console.log("Selected:", fileName);

      require(`./middlewares/${fileName}`);
    })
    .catch(console.error);
};

export default runPrompt();
