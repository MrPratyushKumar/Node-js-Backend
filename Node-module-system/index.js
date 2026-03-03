// What is node js module system ?
// Node js module system allow your code into multiple reusabel peices of code
// In this you have create different modules and you can use those module in a single  root mudule
// it allows you to organize your code to multiple reusable peices of modules
// Each file in a nodejs is treated as a seperate module

// index.js is a root file

// ommojs ->module.exports == export
//commonjs -> require == import

const firstModule = require("./first-module"); // import module

console.log(firstModule.add(10, 2));

try {
  console.log("Trying to divide by zero");
  let result = firstModule.divide(10, 2);
  console.log("result : ", result);
} catch (error) {
  console.log("Caught an error: ", error.message);
}


//notes: 
// How the node module wrapper is work ?

// Node js every module whatever module you have created is wrapped in a function  
// How this work?
// inside the wrapper f'n having exports then we having a  require then module you are getting rendered then file name then directory name 

// function(exports , require , module , _filename , _dirname){
//   // Your actual module code goes inside the wrapper function

// }