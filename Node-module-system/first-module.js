

function add(a , b){
  return a + b;
}

function substract(a  , b){
  return a - b;
}
 function divide(a , b){
  if(b == 0){
    throw new error('Divide by zero is not possible')
  }
  return a / b;
 }

 // export 
 module.exports ={
  add,substract , divide
 }