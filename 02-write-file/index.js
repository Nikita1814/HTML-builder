const fs = require("fs");
const path = require("path");
const { stdin } = process;
const stream = fs.createWriteStream(path.join(__dirname,"text.txt"), "utf-8");
const rl = require("readline").createInterface({
    input: process.stdin,
    output: stream})

    
console.log(
  "The text file has been successfully generated.\nPlease be so kind as to use to input a short textual message in any language utilizing your keyboard, please accept in advance our utmost gratitude for your presumed cooperation"
);

rl.on('line', (input) =>{
    if(input === 'exit'){
    rl.close()
    process.exit()    
    } else{
    rl.output.write(`\n${input}`)
    }   
})



rl.on('close' ,()=>{
console.log('---EXIT MSG---\nThank you for provided information. We wish to express our feelings of profound joy upon the reception of said message and we hope that as we surely will, you too will keep the textual file as a memento of our short yet immeasurably pleasant exchange\n---EXIT MSG---')
})

rl.on('SIGINT', () =>{
process.emit("SIGINT")
})

process.on('SIGINT', ()=>{
    console.log('---EXIT MSG---\nThank you for provided information. We wish to express our feelings of profound joy upon the reception of said message and we hope that you too will keep the textual file as a memento of our short yet immeasurably pleasant exchange\n---EXIT MSG---')
    process.exit()
})
