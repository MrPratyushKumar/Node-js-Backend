const fs = require('fs');
const path = require('path');

// create a data folder 
const dataFolder = path.join(__dirname,'data')// directory name , folder name


if(!fs.existsSync(dataFolder)){
  // fs(filesystem) will check that 'dataFolder' is exist or not -> if not then create this folder into this directory

  fs.mkdirSync(dataFolder);// this will created dataFolder
  console.log("data folder created");
}


// Now create file inside data folder

const filePath = path.join(dataFolder , 'example.txt');// folder name , file name

// sync way to creating the file 
fs.writeFileSync(filePath , "Hello from node js");

console.log("file created succssfully");

// sync way to read the file

const readContentFromFile = fs.readFileSync(filePath , 'utf-8')

console.log("File Content : " , readContentFromFile)


// sync way to append the file

fs.appendFileSync(filePath , '\n This is a new line added to that file')

console.log('new file content added')



// Now async way of creating the file

const asyncFilePath = path.join(dataFolder , 'async-example.txt');//folder name , file name 

fs.writeFile(asyncFilePath, 'Hello, Async node js',(err) => {
  if(err) throw err;
  console.log('Async file is created successfully')

  fs.readFile(asyncFilePath, "utf-8", (err , data) =>{
    if(err) throw err;
    console.log("Async File content : " , data);
  })

  fs.appendFile(asyncFilePath, '\nThis is another ;ine added',(err)=>{
    console.log("new line added to async file");
  })

  fs.readFile(asyncFilePath, "utf-8", (err , updatedData) =>{
    if(err) throw err;
    console.log("Updated  File content : " , updatedData);
  })
})