const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");



//making making folder
async function createDist (){
await fsPromises.mkdir(path.join(__dirname, `project-dist`), {
    recursive: true,
  });
}
//copying assets and creating dist
/*async function copyDir(sourcePath , destinationPath) {
    const subfolders = await fsPromises.readdir(path.join(__dirname, "assets"));
    for (subfolder of subfolders) {
        console.log(file)
      fs.copyFile(path.join(__dirname, "assets", file), path.join(__dirname, "project-dist", 'assets', file), ()=>{console.log(`copied ${file} from ${path.join(__dirname, "files", file)}`)});
    }
  }*/

  async function copyDir(_dir){
    fs.readdir(_dir, { withFileTypes: true }, function(err, items){
        if(err) {throw err}
        console.log('working')
        for (let i = 0; i < items.length; i++){
          if (items[i].isDirectory()){
              console.log(`dir detected ${items[i].name}`)
              async function d(){
              await fsPromises.mkdir(path.join(__dirname, `project-dist`, 'assets', items[i].name), {
                recursive: true,
              })
            }
            d()
            console.log(path.join(__dirname, `project-dist`, 'assets', items[i].name))
             copyDir(_dir + '/' + items[i].name)
          } else if (items[i].isFile()){
            console.log(`file detected ${items[i].name}`)
            fs.copyFile(_dir + '/' + items[i].name, `${_dir.split('06-build-page')[0]}` + `06-build-page\\project-dist` + path.resolve(`${_dir.split('06-build-page')[1]}`).substring(2) +  `\\${items[i].name}`, ()=> {console.log(`${items[i].name} --- ${_dir + '/' + items[i].name} --- ${_dir.split('06-build-page')[0]}` + `06-build-page\\project-dist` + `${_dir.split('06-build-page')[1]}` +  `\\${items[i].name}`)})
          }
        }
     })
}

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





createDist ()
copyDir(path.join(__dirname, "assets"))
bundleFiles()

  