import process from "process";
import ChildProcess from "child_process";
import inq from "inquirer";
import inqDir from "inquirer-select-directory";
import fs, { mkdir } from "fs-extra";
import path from "path";

import { tsConfigSettiings, workspaceSettings } from "../helpers/config";
import { command } from "../types/commands";

export default class Init {
  private usingDir = "./";
  private projectName;

  constructor(commandOption: command, projectName?: string) {
    if (commandOption === command.STYLE) {
      this.initPackageJson();
      this.initVscodeSettings();
      this.installStyleDevDependencies();
    }

    if (commandOption === command.TS) {
      this.initPackageJson();
      this.installTsDependencies();
      this.initTsConfig();
    }

    if (commandOption === command.NEXT) {
      this.projectName = projectName;
      this.addNextBoilerplate();
    }

    if (commandOption === command.GRAPHQL) {
      this.projectName = projectName;
      this.addGraphQlBoilerplate();
    }
  }

  private initPackageJson() {
    if (!fs.existsSync(`${this.usingDir}/package.json`)) {
      process.chdir(this.usingDir);
      ChildProcess.execSync(`npm init -y`);
    }
    console.log("Package.json already exists");
  }

  private installStyleDevDependencies() {
    process.chdir(this.usingDir);
    return ChildProcess.execSync(
      `npm i -D stylelint stylelint-config-property-sort-order-smacss`
    );
  }

  private installTsDependencies() {
    process.chdir(this.usingDir);
    ChildProcess.execSync(`npm i typescript tslib`);
    return ChildProcess.execSync(`npm i -D @types/node`);
  }

  private initVscodeSettings(): void {
    if (!fs.existsSync(`${this.usingDir}/.vscode`)) {
      fs.mkdir(`${this.usingDir}/.vscode`);
    }
    fs.writeFile(`${this.usingDir}/.vscode/settings.json`, workspaceSettings);
  }

  private initTsConfig(): void {
    fs.writeFile(`${this.usingDir}/tsconfig.json`, tsConfigSettiings);
  }

  private addNextBoilerplate() {
    process.chdir(this.usingDir);
    let name = this.projectName;
    if (name === undefined || name === "") name = "next-ts-boilerplate";
    ChildProcess.execSync(
      `git clone https://github.com/arjendevos/next-ts-boilerplate.git ${name}`
    );
    if (name === ".") {
      const pathName = process.cwd();
      const pathArray = pathName.split("\\");
      name = pathArray[pathArray.length - 1];
    } else {
      process.chdir(`${this.usingDir}/${name}`);
    }
    const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    packageJson["name"] = name;
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
    ChildProcess.execSync(`yarn install`);
    ChildProcess.execSync(`git remote rm origin`);
    return console.log(
      "Everything installed and ready for use. Change the origin with git push -u <remote_name> <local_branch_name>"
    );
  }

  private addGraphQlBoilerplate() {
    process.chdir(this.usingDir);
    let name = this.projectName;
    if (name === undefined || name === "") name = "graphql-boilerplate";
    ChildProcess.execSync(
      `git clone https://github.com/arjendevos/graphql-boilerplate.git ${name}`
    );
    if (name === ".") {
      const pathName = process.cwd();
      const pathArray = pathName.split("\\");
      name = pathArray[pathArray.length - 1];
    } else {
      process.chdir(`${this.usingDir}/${name}`);
    }
    const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    packageJson["name"] = name;
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
    ChildProcess.execSync(`yarn install`);
    ChildProcess.execSync(`git remote rm origin`);
    return console.log(
      "Everything installed and ready for use. Change the origin with git push -u <remote_name> <local_branch_name>"
    );
  }
}
