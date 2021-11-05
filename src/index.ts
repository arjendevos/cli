import process from "process";
import inq from "inquirer";

import { searchDirectory } from "./helpers/searchDir";
import Directory from "./commands/directory";
import Init from "./commands/init";

import { command } from "./types/commands";

const main = () => {
  const options: string[] = process.argv;
  if (options[2] === undefined) return menu();

  switch (options[2].toUpperCase()) {
    case "OPEN":
      return open(options);
    case "INIT":
      return init(options);
    default:
      return menu();
  }
};

const open = (options: string[]): void => {
  if (options.length <= 4) return console.log("No directory given");
  const location = searchDirectory(options[3]);

  if (location === "NOTHING" || location === undefined)
    return console.log(location);

  new Directory(location);
};

const init = (options: string[]) => {
  if (options.length <= 4) return console.log("No command given");

  switch (options[3].toUpperCase()) {
    case "STYLE":
      return new Init(command.STYLE);
    case "TS":
      return new Init(command.TS);
    case "NEXT":
      if (options.length >= 5) return new Init(command.NEXT, options[4]);
      return new Init(command.NEXT);
    case "GRAPHQL":
      if (options.length >= 5) return new Init(command.GRAPHQL, options[4]);
      return new Init(command.GRAPHQL);
    default:
      return console.log("No valid command given");
  }
};

const menu = async () => {
  let output = await inq.prompt([
    {
      type: "list",
      name: "command",
      message: "What do you want to do?",
      choices: [
        {
          name: "Open project",
          value: "OPEN",
        },
        {
          name: "Init project",
          value: "INIT",
        },
      ],
    },
  ]);

  console.log(output);

  switch (output.command) {
    case "OPEN":
      return new Directory();
    case "INIT":
      let whatToInit = await inq.prompt([
        {
          type: "list",
          name: "action",
          message: "What do you want to do?",
          choices: [
            {
              name: "Style",
              value: "STYLE",
            },
            {
              name: "Typescript",
              value: "TS",
            },
            {
              name: "Nextjs Boilerplate",
              value: "NEXT",
            },
            {
              name: "GraphQl Boilerplate",
              value: "GRAPHQL",
            },
          ],
        },
      ]);

      let projectName;

      if (whatToInit.action === "NEXT" || whatToInit.action === "GRAPHQL") {
        projectName = await inq.prompt([
          {
            type: "input",
            name: "name",
            message: "What do you want to call your project?",
          },
        ]);
      }

      init([
        "undefined",
        "undefined",
        output.command,
        whatToInit.action,
        projectName.name,
      ]);
  }
};

main();
