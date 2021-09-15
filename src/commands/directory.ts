import process from "process";
import ChildProcess from "child_process";
import inq from "inquirer";
import inqDir from "inquirer-select-directory";
import fs from "fs-extra";

export default class Directory {
  private startDir = "C:/Users/arvoc/Documents/Home";

  constructor(directory?: string) {
    inq.registerPrompt("directory", inqDir);

    if (directory) {
      this.openVsCode(`${this.startDir}/${directory}`);
    } else {
      this.init();
    }
  }

  public async init() {
    const output = await inq.prompt([
      {
        type: "directory",
        name: "project",
        message: "Where you like to go to?",
        basePath: this.startDir,
        options: {
          displayFiles: true,
        },
      },
    ]);

    this.openVsCode(output.project);
  }

  private openVsCode(directory: string): void {
    ChildProcess.exec(`code ${directory}`);
  }

  public move(moveTo: string): string {
    try {
      process.chdir(`${this.startDir}/${moveTo}`);
      return process.cwd();
    } catch (err) {
      throw err;
    }
  }
}
