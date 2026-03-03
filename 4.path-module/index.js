




// path modules provide file and directory path


const { log } = require("console")
const path = require("path")

console.log("Directory name : ", path.dirname(__filename)); // print in which directory you have -> 4.path-module

console.log("file name :", path.basename(__filename)); // print in which file  you have-> index.js


console.log("file extension :", path.extname(__filename));// print the extension of your file->.js

const joinPath = path.join("/user","documents","node","projects");
console.log("Joined Path : ",joinPath);
//Joined Path :  \user\documents\node\projects

const resolvePath = path.resolve("user", "documents" , "node" , "projects" , "npm");


console.log("Resolve Path: ", resolvePath);

// Resolve Path:  C:\Users\91820\Desktop\Node-js-part1\4.path-module\user\documents\node\projects\npm

const normalizePath = path.normalize("/user/.documents/../node/projects")
console.log("normalize path : " , normalizePath);
//normalize path :  \user\node\projects