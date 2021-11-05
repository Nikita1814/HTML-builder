const fs = require("fs");
const path = require("path");
const { stdin } = process;
fs.writeFile(path.join(__dirname, "text.txt"), (err) => {
  if (err) throw err;
  connsole.log('The text file has been successfully generated.\nPlease be so kind as to use to input a short textual message in any language utilizing your keyboard, please accept in advance our utmost gratitude for your presumed cooperation')
})

/*stdin.on('data', data =>{
    fs.createWriteStream((path.join(__dirname, "text.txt"))).write(data.toString)} )

process.on('exit', () => {
console.log('Thank you for your cooperation and for the submitted information, we sincerely wish you a joyful and productive day!')
})*/