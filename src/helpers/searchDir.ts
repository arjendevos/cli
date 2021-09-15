import fs from "fs-extra";

export function searchDirectory(searchDir: string) {
  searchDir = searchDir.toLowerCase();

  const startDir = "C:/Users/arvoc/Documents/Home";
  const folders = listDirectory(startDir);

  for (let iZero = 0; folders.length > iZero; iZero++) {
    if (folders[iZero].toLowerCase() === searchDir) return folders[iZero];

    console.log(`Looking inside: ${folders[iZero]}`);
    const layerTwo = listDirectory(`${startDir}/${folders[iZero]}`);

    // console.log(layerTwo);

    for (let iTwo = 0; layerTwo.length > iTwo; iTwo++) {
      if (layerTwo[iTwo].toLowerCase() === searchDir)
        return `${folders[iZero]}/${layerTwo[iTwo]}`;

      console.log(`Looking inside: ${folders[iZero]}/${layerTwo[iTwo]}`);
      const layerThree = listDirectory(
        `${startDir}/${folders[iZero]}/${layerTwo[iTwo]}`
      );

      const found = layerThree.find(
        (folder) => folder.toLowerCase() === searchDir
      );

      if (found !== undefined)
        return `${folders[iZero]}/${layerTwo[iTwo]}/${found}`;

      //   console.log(layerThree);
    }
  }

  return "NOTHING";
}

function listDirectory(dir: string): string[] {
  let files = fs.readdirSync(dir);
  files = files.filter((file) => !file.includes("."));
  return files;
}
