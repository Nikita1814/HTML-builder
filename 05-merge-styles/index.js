const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");
let data = ''
async function bundleFiles() {
    const files = await fsPromises.readdir(
      path.join(__dirname, "styles"),
      { withFileTypes: true }
    );
    for (file of files) {
      if (file.isFile() && path.parse(file.name).ext ==='.css' ) {
     console.log(file.name)
      }
    }
  }
  bundleFiles()