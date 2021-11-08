const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");

//making folder
async function createDist() {
  await fsPromises.mkdir(path.join(__dirname, `project-dist`), {
    recursive: true,
  });
  await fsPromises.mkdir(path.join(__dirname, `project-dist`, 'assets'), {
    recursive: true,
  });
  console.log("DIST created");
}

/*async function createAssets() {

  console.log("Assets created");
}*/
//copying assets and creating dist
/*async function copyDir(sourcePath , destinationPath) {
    const subfolders = await fsPromises.readdir(path.join(__dirname, "assets"));
    for (subfolder of subfolders) {
        console.log(file)
      fs.copyFile(path.join(__dirname, "assets", file), path.join(__dirname, "project-dist", 'assets', file), ()=>{console.log(`copied ${file} from ${path.join(__dirname, "files", file)}`)});
    }
  }*/


async function copyDir(_dir) {
  fs.readdir(_dir, { withFileTypes: true }, function (err, items) {
    if (err) {
      throw err;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].isDirectory()) {
        console.log(`dir detected ${items[i].name}`);
        async function createFolder() {
          await fsPromises.mkdir(
            path.join(__dirname, `project-dist`, "assets", items[i].name),
            {
              recursive: true,
            }
          );
        }
        createFolder().then(copyDir(_dir + "/" + items[i].name));
      } else if (items[i].isFile()) {
        console.log(`file detected ${items[i].name}`);
        async function cf() {
          await fsPromises.copyFile(
            path.resolve(_dir) + "/" + items[i].name,
            `${_dir.split("06-build-page")[0]}` +
              `06-build-page\\project-dist` +
              path.resolve(`${_dir.split("06-build-page")[1]}`).substring(2) +
              `\\${items[i].name}`
          );
          /*console.log(
            `${items[i].name} --- ${_dir + "/" + items[i].name} --- ${
              _dir.split("06-build-page")[0]
            }` +
              `06-build-page\\project-dist` +
              path.resolve(`${_dir.split("06-build-page")[1]}`).substring(2) +
              `\\${items[i].name}`
          );*/
        }
        cf();
      }
    }
  });
}

async function bundleFiles() {
  const files = await fsPromises.readdir(path.join(__dirname, "styles"), {
    withFileTypes: true,
  });
  let bundle = [];
  for (file of files) {
    if (file.isFile() && path.parse(file.name).ext === ".css") {
      let res = await fsPromises.readFile(
        path.join(__dirname, "styles", file.name),
        "utf-8",
        function (err, data) {
          if (err) console.log(err);
          return data;
        }
      );
      bundle.push(res);
    }
  }
  console.log(bundle.length);

  fs.writeFile(
    path.join(__dirname, "project-dist", "style.css"),
    bundle.join(""),
    function (err) {
      if (err) console.log(err);
      console.log(
        `file style.css created on path ${path.join(
          __dirname,
          "project-dist",
          "style.css"
        )}`
      );
    }
  );
}

async function composeIndex() {
  console.log('------ COMMENCING--------')
  let template = await fsPromises.readFile(
    path.join(__dirname, "template.html"),
    "utf-8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  /*console.log(template);*/

  const files = await fsPromises.readdir(path.join(__dirname, "components"), {
    withFileTypes: true,
  });
  for (file of files) {
    if (file.isFile() && path.parse(file.name).ext === ".html") {
      if (template.includes(`{{${file.name.split(".")[0]}}}`)) {
     
        let component = await fsPromises.readFile(
          path.join(__dirname, "components", file.name),
          "utf-8",
          (err, data) => {
            if (err) throw err;
            return data;
          }
        );
        console.log(file.name)
        console.log(`{{${file.name.split(".")[0]}}}`)
        console.log(component)
        
      
        template = template.replace(
          `{{${file.name.split(".")[0]}}}`,
          component
        );
      }
    }
  }
  fs.writeFile(
    path.join(__dirname, "project-dist", "index.html"),
    template,
    function (err) {
      if (err) console.log(err);
      console.log(
        `file index.html created on path ${path.join(
          __dirname,
          "project-dist",
          "index.html"
        )}`
      );
    }
  );
}

createDist ()
.then(copyDir(path.join(__dirname, "assets")))
.then(bundleFiles())
.then(composeIndex())
