function delayFn(time){
  return new Promise((resolve)=>setTimeout(resolve , time))
}

async function delayedGreet(name){
  await delayFn(2000)
  console.log(name)
}
delayedGreet("PratyushPandey")

// Example for error handling 

async function division(num1 , num2) {
  try {
    if(num2 === 0) throw new Error('Can not divide by 0')
      return num1/num2;
    
  } catch (error) {
    console.error('error', error)
  }
}

async function mainFn() {
  console.log(await  division(10 , 2))

  console.log(await  division(10 , 0))
}

mainFn()


 // Async-await use for to handle asynchronous operation
 // Whatever async function you have created it always return a promises 
 // await keyword use only the async function you can't use outside the async function 
 // await keyword pauses the execution of the function until your promise is  getting resolved 