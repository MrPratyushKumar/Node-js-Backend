const fs = require('fs')

function person(name , callbackFn){
  console.log(`Hello ${name}`)
  callbackFn(); // calling call back f'm i.e address()
}
function address(){
  console.log("India")
}

person('Pratyush Pandey' , address); // call person and pass name , address function as call back function 


// reading file synchronously
fs.readFile('input.txt', 'utf8' , (err , data)=>{
  if(err){
    console.error('Error reading file', err)
    return
  }

  console.log(data)
})





// Notes:This is the example callback in the context of Nodejs 



//  What is call back function?
//  callbacks are function that  are passed as argument to the other Function , Callback function allows you to defer the execution of a code until after an asynchronous operation has completed 