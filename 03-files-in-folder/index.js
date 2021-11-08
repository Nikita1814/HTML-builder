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
      let nom = file.name
      async function stats() {
        res = await fsPromises.stat(
          path.join(__dirname, "secret-folder", nom)
        );
        console.log(
          `${path.parse(nom).name} - ${path
            .parse(nom)
            .ext.substr(1)} - ${res.size / 1000}kb`
        );
      }
      stats();
    }
  }
}
showFiles();
