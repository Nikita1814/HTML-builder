const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");

async function bundleFiles() {
    const files = await fsPromises.readdir(
      path.join(__dirname, "styles"),
      { withFileTypes: true }
    );
    let bundle = []
    for (file of files) {
    if (file.isFile() && path.parse(file.name).ext ==='.css' ) {
     let res = await fsPromises.readFile(path.join(__dirname, "styles",file.name), 'utf-8', function( err, data){
     if(err) console.log(err)
    return data
     /*console.log(data)*/
     }
    )
    bundle.push(res)
      }
    }
    console.log(bundle.length)

    fs.writeFile(path.join(__dirname,'project-dist','bundle.css'), bundle.join(''), function( err){
    if (err) console.log(err)
    console.log(`file bundle.css created on path ${path.join(__dirname,'project-dist','bundle.css')}`)
    } )
}

bundleFiles()
