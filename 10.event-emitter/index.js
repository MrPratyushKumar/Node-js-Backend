const EventEmitter = require('events')

const myFirstEmitter = new EventEmitter()

// register a listner 
myFirstEmitter.on('greet', (name)=>{
  console.log(`Hello ${name}`)
})

// call this event
myFirstEmitter.emit('greet' , 'Pratyush Pandey')