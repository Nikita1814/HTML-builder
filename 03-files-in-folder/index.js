const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");

async function showFiles() {
  const files = await fsPromises.readdir(
    path.join(__dirname, "secret-folder"),
    { withFileTypes: true }
  );
  for (file of files) {
    if (file.isFile()) {
      async function stats() {
        res = await fsPromises.stat(
          path.join(__dirname, "secret-folder", file.name)
        );

        console.log(
          `${path.parse(file.name).name} - ${path
            .parse(file.name)
            .ext.substr(1)} - ${res.size / 1000}kb`
        );
      }
      stats();
    }
  }
}
showFiles();
