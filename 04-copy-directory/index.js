const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");

async function copyDir() {
  await fsPromises.mkdir(path.join(__dirname, `files-copy`), {
    recursive: true,
  });

  const files = await fsPromises.readdir(path.join(__dirname, "files"));
  for (file of files) {
      console.log(file)
    fs.copyFile(path.join(__dirname, "files", file), path.join(__dirname, "files-copy", file), ()=>{console.log(`copied ${file} from ${path.join(__dirname, "files", file)}`)});
  }
}
copyDir();
