const http = require('http')

// lets create a server using http module

const server = http.createServer((req , res) =>{
  console.log(req , 'req')
  res.writeHead(200,{"Content-Type":"text/plain"})
  res.end("Hello node js from Http module");
})

// create a connection
const port = 3000;
server.listen(port , ()=>{
  console.log(`Server is now listening to port ${port}`)
})
