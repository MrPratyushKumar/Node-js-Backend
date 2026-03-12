# 📘 Node.js Backend - Complete Revision Notes

> **Easy-to-understand guide with diagrams, examples, and simple explanations**

---

## 📑 Table of Contents

1. [Node.js Module System](#1-nodejs-module-system)
2. [Path Module](#2-path-module)
3. [File System (FS) Module](#3-file-system-fs-module)
4. [HTTP Module & Server](#4-http-module--server)
5. [Callbacks](#5-callbacks)
6. [Promises](#6-promises)
7. [Async/Await](#7-asyncawait)
8. [Event Emitters](#8-event-emitters)

---

## 1. Node.js Module System

### 🤔 What is a Module?

**Simple Answer:** A module is just a JavaScript file that contains reusable code. Instead of writing everything in one file, you can split your code into multiple files (modules).

### 📊 Visual Diagram

```
┌─────────────────────────────────────────────────┐
│                 index.js (Main File)            │
│  ┌──────────────────────────────────────────┐   │
│  │  const math = require('./math-module')   │   │
│  │  console.log(math.add(5, 3))  // 8      │   │
│  └──────────────────────────────────────────┘   │
│                      ↓                          │
│              (imports from)                     │
│                      ↓                          │
│  ┌──────────────────────────────────────────┐   │
│  │        math-module.js                     │   │
│  │  function add(a, b) { return a + b }     │   │
│  │  module.exports = { add }                │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### 💻 Code Example

**first-module.js** (Child Module)
```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// Export functions so other files can use them
module.exports = {
  add,
  subtract,
  divide
};
```

**index.js** (Main File)
```javascript
// Import the module
const firstModule = require('./first-module');

// Use the imported functions
console.log(firstModule.add(10, 2));        // 12
console.log(firstModule.subtract(10, 2));   // 8

try {
  console.log(firstModule.divide(10, 2));   // 5
} catch (error) {
  console.log('Error:', error.message);
}
```

### 🔑 Key Concepts

| CommonJS Syntax | Modern ES6 Syntax | What it does |
|----------------|-------------------|--------------|
| `module.exports = {}` | `export default {}` | Export code |
| `require('./file')` | `import from './file'` | Import code |

### 🎁 Module Wrapper Function

**What Node.js does behind the scenes:**

Every module you create is automatically wrapped in a function:

```javascript
(function(exports, require, module, __filename, __dirname) {
  // Your actual module code goes here
  
  function add(a, b) {
    return a + b;
  }
  
  module.exports = { add };
})
```

**Why?** This gives each module:
- `exports` - object to export values
- `require` - function to import other modules
- `module` - reference to current module
- `__filename` - full path to current file
- `__dirname` - directory path of current file

---

## 2. Path Module

### 🤔 What is Path Module?

**Simple Answer:** Path module helps you work with file and folder paths on your computer. It makes sure paths work on Windows, Mac, and Linux.

### 📊 Visual Diagram

```
File Path Breakdown:
┌────────────────────────────────────────────────────┐
│  C:\Users\Desktop\projects\app\index.js           │
│  └─┬─┘ └──┬──┘ └──┬──┘ └──┬──┘ └─┬─┘ └──┬──┘     │
│    │      │        │        │      │      │        │
│  Drive  User    Folder   Folder  Dir   File       │
└────────────────────────────────────────────────────┘
       ↓          ↓          ↓        ↓       ↓
  __dirname = C:\Users\Desktop\projects\app
  __filename = C:\Users\Desktop\projects\app\index.js
  basename = index.js
  extname = .js
```

### 💻 Code Examples

```javascript
const path = require('path');

// 1. Get directory name
console.log(path.dirname(__filename));
// Output: C:\Users\Desktop\projects\4.path-module

// 2. Get file name
console.log(path.basename(__filename));
// Output: index.js

// 3. Get file extension
console.log(path.extname(__filename));
// Output: .js

// 4. Join paths (creates proper path for your OS)
const joinedPath = path.join('/user', 'documents', 'node', 'projects');
console.log(joinedPath);
// Output (Windows): \user\documents\node\projects
// Output (Mac/Linux): /user/documents/node/projects

// 5. Resolve to absolute path
const absolutePath = path.resolve('user', 'documents', 'node');
console.log(absolutePath);
// Output: C:\Users\Desktop\current-folder\user\documents\node

// 6. Normalize path (clean up messy paths)
const messyPath = path.normalize('/user/./documents/../node/projects');
console.log(messyPath);
// Output: \user\node\projects
// (removed . and .. references)
```

### 🎯 When to Use Each Method

| Method | Use When You Need To |
|--------|---------------------|
| `dirname()` | Get folder path where file is located |
| `basename()` | Get just the file name |
| `extname()` | Get file extension (.js, .txt, etc) |
| `join()` | Combine multiple path segments |
| `resolve()` | Get absolute path from current location |
| `normalize()` | Clean up messy paths with .. and . |

### 🌟 Real-World Example

```javascript
const path = require('path');

// Create path to a data file in your project
const dataFolder = path.join(__dirname, 'data');
const configFile = path.join(dataFolder, 'config.json');

console.log(configFile);
// Output: C:\Your\Project\data\config.json
```

---

## 3. File System (FS) Module

### 🤔 What is FS Module?

**Simple Answer:** FS (File System) module lets you create, read, update, and delete files and folders on your computer using Node.js.

### 📊 Visual Diagram - Sync vs Async

```
SYNCHRONOUS (Blocking)          ASYNC (Non-Blocking)
─────────────────────          ──────────────────────

Task 1 ──────────┐             Task 1 ────┐
                 │                         │
Task 2 (Wait...) │             Task 2 ────┤
                 │                         │
Task 3 (Wait...) │             Task 3 ────┤
                 │                         │
     ↓           │                  ↓      ↓
  Finish         │               All finish together
                 ↓
              Finish
              
❌ Blocks other code           ✅ Doesn't block code
⏱️ Takes longer                ⚡ Faster overall
```

### 💻 Synchronous File Operations (Blocking)

```javascript
const fs = require('fs');
const path = require('path');

// 1. Create a folder
const dataFolder = path.join(__dirname, 'data');

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log('Data folder created');
}

// 2. Create a file and write content
const filePath = path.join(dataFolder, 'example.txt');
fs.writeFileSync(filePath, 'Hello from Node.js');
console.log('File created');

// 3. Read file content
const content = fs.readFileSync(filePath, 'utf-8');
console.log('File Content:', content);
// Output: Hello from Node.js

// 4. Append (add) content to file
fs.appendFileSync(filePath, '\nThis is a new line');
console.log('Content added');

// 5. Read updated content
const updatedContent = fs.readFileSync(filePath, 'utf-8');
console.log(updatedContent);
// Output: 
// Hello from Node.js
// This is a new line
```

### ⚡ Asynchronous File Operations (Non-Blocking)

```javascript
const fs = require('fs');
const path = require('path');

const asyncFilePath = path.join(__dirname, 'data', 'async-example.txt');

// 1. Create file (Async way)
fs.writeFile(asyncFilePath, 'Hello, Async Node.js', (err) => {
  if (err) throw err;
  console.log('Async file created');
  
  // 2. Read file (Async way)
  fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('Async File Content:', data);
  });
  
  // 3. Append to file (Async way)
  fs.appendFile(asyncFilePath, '\nNew line added', (err) => {
    if (err) throw err;
    console.log('New line added');
    
    // 4. Read updated file
    fs.readFile(asyncFilePath, 'utf-8', (err, updatedData) => {
      if (err) throw err;
      console.log('Updated Content:', updatedData);
    });
  });
});
```

### 📋 FS Methods Comparison

| Operation | Synchronous (Blocking) | Asynchronous (Non-Blocking) |
|-----------|----------------------|---------------------------|
| **Create Folder** | `fs.mkdirSync(path)` | `fs.mkdir(path, callback)` |
| **Check Exists** | `fs.existsSync(path)` | `fs.access(path, callback)` |
| **Write File** | `fs.writeFileSync(path, data)` | `fs.writeFile(path, data, callback)` |
| **Read File** | `fs.readFileSync(path, encoding)` | `fs.readFile(path, encoding, callback)` |
| **Append File** | `fs.appendFileSync(path, data)` | `fs.appendFile(path, data, callback)` |
| **Delete File** | `fs.unlinkSync(path)` | `fs.unlink(path, callback)` |

### 🎯 Which One to Use?

```
Use SYNCHRONOUS when:
✅ Script runs only once (like setup scripts)
✅ Simple one-time tasks
✅ Reading config at startup

Use ASYNCHRONOUS when:
✅ Building web servers
✅ Handling multiple requests
✅ Performance matters
✅ Don't want to block other code
```

### 🌟 Real-World Example

```javascript
const fs = require('fs');
const path = require('path');

// Create a logs folder and write error logs
const logsFolder = path.join(__dirname, 'logs');

if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}

const logFile = path.join(logsFolder, 'error.log');
const errorMessage = `[${new Date().toISOString()}] Error occurred\n`;

fs.appendFile(logFile, errorMessage, (err) => {
  if (err) console.error('Failed to write log');
  else console.log('Error logged successfully');
});
```

---

## 4. HTTP Module & Server

### 🤔 What is HTTP Module?

**Simple Answer:** HTTP module lets you create a web server that can handle requests from browsers or other clients. It's like creating your own mini website backend!

### 📊 Visual Diagram - How HTTP Works

```
CLIENT (Browser)                    SERVER (Your Node.js App)
─────────────────                   ─────────────────────────

User types URL
   localhost:3000          ──────REQUEST─────>    Server receives
        │                                          request
        │                                               │
        │                                          Checks URL
        │                                          Prepares response
        │                                               │
  Browser shows       <─────RESPONSE──────      Sends back data
   "Hello World"
```

### 💻 Simple Server Example

```javascript
const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
  // req = request from client
  // res = response you send back
  
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello Node.js from HTTP module");
});

// Start listening on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

**How to test:**
1. Run: `node server.js`
2. Open browser: `http://localhost:3000`
3. You'll see: "Hello Node.js from HTTP module"

### 🛣️ Routing - Multiple Pages

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  
  if (url === '/') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home Page");
  } 
  else if (url === '/projects') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Projects Page");
  } 
  else if (url === '/about') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Page");
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

**Test different routes:**
- `http://localhost:3000/` → "Home Page"
- `http://localhost:3000/projects` → "Projects Page"
- `http://localhost:3000/about` → "About Page"
- `http://localhost:3000/random` → "404 - Page Not Found"

### 📊 HTTP Status Codes

```
┌─────────┬────────────────────────────────────────┐
│  Code   │  Meaning                               │
├─────────┼────────────────────────────────────────┤
│  200    │  ✅ OK - Everything worked             │
│  201    │  ✅ Created - Resource created         │
│  400    │  ❌ Bad Request - Client error         │
│  404    │  ❌ Not Found - Page doesn't exist    │
│  500    │  ❌ Server Error - Server crashed      │
└─────────┴────────────────────────────────────────┘
```

### 🎯 Request Object Properties

```javascript
const server = http.createServer((req, res) => {
  console.log('URL:', req.url);           // /about
  console.log('Method:', req.method);     // GET, POST, etc.
  console.log('Headers:', req.headers);   // Browser info
  
  res.end('Request received');
});
```

### 🌟 Real-World Example - JSON API

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/api/users') {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
    
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000);
```

---

## 5. Callbacks

### 🤔 What is a Callback?

**Simple Answer:** A callback is a function that you pass into another function as an argument. The receiving function will call it later when it's done with its work.

**Real-life analogy:** Like giving your phone number to a pizza delivery person and saying "call me when the pizza is ready" - that's a callback!

### 📊 Visual Diagram

```
Normal Function Call:
────────────────────
doTask() ──> Returns result immediately ──> Continue


Callback Function:
──────────────────
doTask(callbackFn) ──> Starts work...
                       (other code runs)
                       Work done! ──> Calls callbackFn ──> Continue
```

### 💻 Simple Callback Example

```javascript
// Callback function
function sayAddress() {
  console.log("India");
}

// Function that accepts a callback
function greetPerson(name, callbackFn) {
  console.log(`Hello ${name}`);
  callbackFn(); // Execute the callback
}

// Call it
greetPerson('Pratyush Pandey', sayAddress);

// Output:
// Hello Pratyush Pandey
// India
```

### ⚡ Callback with File Reading

```javascript
const fs = require('fs');

// Asynchronous file reading with callback
fs.readFile('input.txt', 'utf8', (err, data) => {
  // This callback runs AFTER file is read
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  console.log('File content:', data);
});

console.log('This runs first!');

// Output:
// This runs first!
// File content: (whatever is in the file)
```

### 🔥 Callback Hell (Pyramid of Doom)

```javascript
const fs = require('fs');

// ❌ BAD - Nested callbacks (Callback Hell)
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  
  const modifiedData = data.toUpperCase();
  
  fs.writeFile('output.txt', modifiedData, (err) => {
    if (err) throw err;
    
    console.log('Data written');
    
    fs.readFile('output.txt', 'utf8', (err, data) => {
      if (err) throw err;
      
      console.log('Final data:', data);
    });
  });
});
```

**Why is this bad?**
```
┌─ Callback 1
│  ┌─ Callback 2
│  │  ┌─ Callback 3
│  │  │  ┌─ Callback 4   ← Code keeps going right!
│  │  │  │                 Hard to read!
│  │  │  │                 Hard to debug!
│  │  │  └─
│  │  └─
│  └─
└─
```

### ✅ Better Solution: Use Promises or Async/Await

We'll cover these in the next sections!

### 🎯 Callback Summary

| Concept | Explanation |
|---------|-------------|
| **What** | Function passed as argument to another function |
| **When** | Called after an async operation completes |
| **Problem** | Can lead to "callback hell" with nested callbacks |
| **Solution** | Use Promises or Async/Await instead |

---

## 6. Promises

### 🤔 What is a Promise?

**Simple Answer:** A Promise is an object that represents a task that will complete in the future. It can either succeed (resolve) or fail (reject).

**Real-life analogy:** Like ordering food online:
- Promise is made: "Your food will arrive"
- Resolved: Food arrives ✅
- Rejected: Delivery failed ❌

### 📊 Visual Diagram

```
Promise States:
───────────────

Start ──> PENDING ──┬──> FULFILLED (Resolved) ✅
                    │
                    └──> REJECTED (Error) ❌


Promise Flow:
─────────────

new Promise((resolve, reject) => {
    // Do async work
    if (success) resolve(data)
    else reject(error)
})
    ↓
.then(data => {
    // Handle success
})
    ↓
.catch(error => {
    // Handle error
})
```

### 💻 Basic Promise Example

```javascript
function delayFn(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

console.log('Start');

delayFn(2000)
  .then(() => console.log('After 2 seconds - Promise resolved!'));

console.log('End');

// Output:
// Start
// End
// (2 seconds later...)
// After 2 seconds - Promise resolved!
```

### ⚡ Promise with Resolve and Reject

```javascript
function divideFn(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject('Cannot divide by zero'); // ❌ Reject
    } else {
      resolve(num1 / num2); // ✅ Resolve
    }
  });
}

// Using the promise
divideFn(10, 2)
  .then(result => console.log('Result:', result))
  .catch(error => console.log('Error:', error));
// Output: Result: 5

divideFn(10, 0)
  .then(result => console.log('Result:', result))
  .catch(error => console.log('Error:', error));
// Output: Error: Cannot divide by zero
```

### 🔗 Promise Chaining

```javascript
function step1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Step 1 complete'), 1000);
  });
}

function step2(message) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${message} -> Step 2 complete`), 1000);
  });
}

function step3(message) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${message} -> Step 3 complete`), 1000);
  });
}

// Chain promises
step1()
  .then(result1 => {
    console.log(result1);
    return step2(result1);
  })
  .then(result2 => {
    console.log(result2);
    return step3(result2);
  })
  .then(result3 => {
    console.log(result3);
  })
  .catch(error => console.log('Error:', error));

// Output (one per second):
// Step 1 complete
// Step 1 complete -> Step 2 complete
// Step 1 complete -> Step 2 complete -> Step 3 complete
```

### 🌟 Real-World Example - File Operations with Promises

```javascript
const fs = require('fs').promises; // Use promise version

// Reading file with promises (no callback hell!)
fs.readFile('input.txt', 'utf8')
  .then(data => {
    console.log('File content:', data);
    const upperData = data.toUpperCase();
    return fs.writeFile('output.txt', upperData);
  })
  .then(() => {
    console.log('File written successfully');
    return fs.readFile('output.txt', 'utf8');
  })
  .then(data => {
    console.log('New file content:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### 📋 Promise Methods

| Method | What it does |
|--------|-------------|
| `.then()` | Runs when promise resolves (success) |
| `.catch()` | Runs when promise rejects (error) |
| `.finally()` | Runs regardless of success/failure |
| `Promise.all([p1, p2])` | Wait for all promises to resolve |
| `Promise.race([p1, p2])` | Wait for first promise to resolve |

### ✅ Callbacks vs Promises

```
CALLBACKS (Old Way)              PROMISES (Better Way)
───────────────────              ────────────────────

fs.readFile('file', (err, data) => {    fs.promises.readFile('file')
  if (err) {                              .then(data => {
    // handle error                          // handle data
  } else {                                 })
    // handle data                          .catch(err => {
  }                                          // handle error
})                                        });

❌ Nested structure                      ✅ Flat structure
❌ Hard to read                           ✅ Easy to read
❌ Error handling messy                   ✅ Clean error handling
```

---

## 7. Async/Await

### 🤔 What is Async/Await?

**Simple Answer:** Async/Await is a cleaner way to work with Promises. It makes asynchronous code look and behave like synchronous code, making it easier to read and understand.

**Real-life analogy:** Instead of saying "Call me when ready" (callbacks/promises), you say "I'll wait here until you're ready" (async/await).

### 📊 Visual Diagram

```
PROMISES (then/catch)                ASYNC/AWAIT (cleaner)
─────────────────────               ──────────────────────

fetchData()                         async function getData() {
  .then(data => {                     try {
    processData(data)                   const data = await fetchData();
  })                                    processData(data);
  .then(result => {                     const result = await saveData();
    saveData(result)                    console.log('Done');
  })                                  } catch (error) {
  .catch(error => {                     console.error(error);
    console.error(error)              }
  })                                }

❌ Callback style                    ✅ Looks synchronous
❌ Harder to read                     ✅ Easy to read
```

### 💻 Basic Async/Await Example

```javascript
function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function delayedGreet(name) {
  console.log('Waiting...');
  await delayFn(2000); // Wait 2 seconds
  console.log(`Hello ${name}`);
}

delayedGreet('Pratyush Pandey');

// Output:
// Waiting...
// (2 seconds later...)
// Hello Pratyush Pandey
```

### ⚡ Async/Await with Error Handling

```javascript
async function division(num1, num2) {
  try {
    if (num2 === 0) {
      throw new Error('Cannot divide by 0');
    }
    return num1 / num2;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

async function mainFn() {
  const result1 = await division(10, 2);
  console.log('Result 1:', result1); // 5
  
  const result2 = await division(10, 0);
  console.log('Result 2:', result2); // null
}

mainFn();

// Output:
// Result 1: 5
// Error: Cannot divide by 0
// Result 2: null
```

### 🔗 Multiple Async Operations

```javascript
async function fetchUserData() {
  console.log('Step 1: Fetching user...');
  await delayFn(1000);
  return { id: 1, name: 'John' };
}

async function fetchUserPosts(userId) {
  console.log('Step 2: Fetching posts...');
  await delayFn(1000);
  return ['Post 1', 'Post 2', 'Post 3'];
}

async function fetchPostComments(post) {
  console.log('Step 3: Fetching comments...');
  await delayFn(1000);
  return ['Comment 1', 'Comment 2'];
}

async function getAllData() {
  try {
    const user = await fetchUserData();
    console.log('User:', user);
    
    const posts = await fetchUserPosts(user.id);
    console.log('Posts:', posts);
    
    const comments = await fetchPostComments(posts[0]);
    console.log('Comments:', comments);
    
    console.log('All data fetched!');
  } catch (error) {
    console.error('Error:', error);
  }
}

getAllData();
```

### 🌟 Real-World Example - File Operations

```javascript
const fs = require('fs').promises;

async function fileOperations() {
  try {
    // Read file
    const data = await fs.readFile('input.txt', 'utf8');
    console.log('Original:', data);
    
    // Transform data
    const upperData = data.toUpperCase();
    
    // Write to new file
    await fs.writeFile('output.txt', upperData);
    console.log('File written');
    
    // Read new file
    const newData = await fs.readFile('output.txt', 'utf8');
    console.log('New content:', newData);
    
  } catch (error) {
    console.error('File operation failed:', error);
  }
}

fileOperations();
```

### 🎯 Key Rules for Async/Await

```
✅ DO:
────────────────────────────────────────
1. async function myFunction() { }
   - Mark function with 'async' keyword

2. const result = await somePromise();
   - Use 'await' only inside async functions

3. try/catch for error handling
   - Wrap await calls in try/catch

4. return values directly
   - Async functions automatically return promises


❌ DON'T:
────────────────────────────────────────
1. await outside async function
   - Will cause syntax error

2. Forget try/catch
   - Unhandled errors will crash app

3. Use .then() with await
   - Mixing styles is confusing
```

### 📋 Evolution of Async Code

```javascript
// 1️⃣ CALLBACKS (Old - Pyramid of Doom)
fs.readFile('file1', (err, data1) => {
  fs.readFile('file2', (err, data2) => {
    fs.readFile('file3', (err, data3) => {
      // Do something
    });
  });
});

// 2️⃣ PROMISES (Better - Flat chain)
fs.promises.readFile('file1')
  .then(data1 => fs.promises.readFile('file2'))
  .then(data2 => fs.promises.readFile('file3'))
  .then(data3 => {
    // Do something
  });

// 3️⃣ ASYNC/AWAIT (Best - Looks synchronous)
async function readFiles() {
  const data1 = await fs.promises.readFile('file1');
  const data2 = await fs.promises.readFile('file2');
  const data3 = await fs.promises.readFile('file3');
  // Do something
}
```

### 💡 Important Notes

| Concept | Explanation |
|---------|-------------|
| **async keyword** | Makes a function return a Promise |
| **await keyword** | Pauses execution until Promise resolves |
| **Only in async** | `await` only works inside `async` functions |
| **Error handling** | Use `try/catch` blocks |
| **Return value** | Async functions always return a Promise |

---

## 8. Event Emitters

### 🤔 What is an Event Emitter?

**Simple Answer:** Event Emitter is like a notification system. You can "listen" for events and do something when they happen. Think of it like subscribing to notifications on your phone!

**Real-life analogy:** 
- **Doorbell** - Someone presses (emits event) → You hear the ring (listener) → You open door (action)

### 📊 Visual Diagram

```
Event Emitter System:
──────────────────────

1. REGISTER LISTENER (Subscribe)
   ┌─────────────────────────────┐
   │ "When 'greet' happens,      │
   │  run this function"         │
   └─────────────────────────────┘
              ↓
2. EMIT EVENT (Trigger)
   ┌─────────────────────────────┐
   │ Something happens!          │
   │ EMIT: 'greet'               │
   └─────────────────────────────┘
              ↓
3. LISTENER EXECUTES (Response)
   ┌─────────────────────────────┐
   │ Function runs automatically │
   │ "Hello Pratyush"            │
   └─────────────────────────────┘
```

### 💻 Basic Event Emitter Example

```javascript
const EventEmitter = require('events');

// Create an event emitter
const myEmitter = new EventEmitter();

// Step 1: Register a listener (subscribe to event)
myEmitter.on('greet', (name) => {
  console.log(`Hello ${name}`);
});

// Step 2: Emit the event (trigger it)
myEmitter.emit('greet', 'Pratyush Pandey');

// Output: Hello Pratyush Pandey
```

### 🔔 Multiple Listeners for Same Event

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Listener 1
myEmitter.on('userLogin', (username) => {
  console.log(`${username} logged in`);
});

// Listener 2
myEmitter.on('userLogin', (username) => {
  console.log(`Sending welcome email to ${username}`);
});

// Listener 3
myEmitter.on('userLogin', (username) => {
  console.log(`Logging activity for ${username}`);
});

// Emit event - ALL listeners will run
myEmitter.emit('userLogin', 'john_doe');

// Output:
// john_doe logged in
// Sending welcome email to john_doe
// Logging activity for john_doe
```

### 🎨 Custom Event Emitter Class

```javascript
const EventEmitter = require('events');

// Create custom emitter class
class MyCustomEmitter extends EventEmitter {
  constructor() {
    super();
    this.greeting = 'Hello';
  }
  
  greet(name) {
    // Emit 'greeting' event with parameters
    this.emit('greeting', this.greeting, name);
  }
}

// Create instance
const myCustomEmitter = new MyCustomEmitter();

// Register listener
myCustomEmitter.on('greeting', (greeting, name) => {
  console.log(`${greeting} ${name}`);
});

// Trigger the event
myCustomEmitter.greet('Pratyush Pandey');

// Output: Hello Pratyush Pandey
```

### 🌟 Real-World Example - User System

```javascript
const EventEmitter = require('events');

class UserSystem extends EventEmitter {
  constructor() {
    super();
    this.users = [];
  }
  
  registerUser(username, email) {
    const user = { username, email, createdAt: new Date() };
    this.users.push(user);
    
    // Emit event when user registers
    this.emit('userRegistered', user);
  }
  
  loginUser(username) {
    const user = this.users.find(u => u.username === username);
    if (user) {
      this.emit('userLoggedIn', user);
    } else {
      this.emit('loginFailed', username);
    }
  }
}

// Create user system
const userSystem = new UserSystem();

// Set up listeners
userSystem.on('userRegistered', (user) => {
  console.log(`✅ New user registered: ${user.username}`);
  console.log(`📧 Sending welcome email to ${user.email}`);
});

userSystem.on('userLoggedIn', (user) => {
  console.log(`🔓 User logged in: ${user.username}`);
});

userSystem.on('loginFailed', (username) => {
  console.log(`❌ Login failed for: ${username}`);
});

// Test the system
userSystem.registerUser('john_doe', 'john@example.com');
userSystem.loginUser('john_doe');
userSystem.loginUser('unknown_user');

// Output:
// ✅ New user registered: john_doe
// 📧 Sending welcome email to john@example.com
// 🔓 User logged in: john_doe
// ❌ Login failed for: unknown_user
```

### 📋 Event Emitter Methods

| Method | What it does |
|--------|-------------|
| `.on(event, listener)` | Register a listener (can trigger multiple times) |
| `.once(event, listener)` | Register listener that runs only once |
| `.emit(event, ...args)` | Trigger an event with optional arguments |
| `.removeListener(event, listener)` | Remove a specific listener |
| `.removeAllListeners(event)` | Remove all listeners for an event |
| `.listenerCount(event)` | Get number of listeners for an event |

### 🎯 Event Emitter Methods Example

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Regular listener - runs every time
emitter.on('data', (msg) => {
  console.log('Regular listener:', msg);
});

// One-time listener - runs only once
emitter.once('data', (msg) => {
  console.log('One-time listener:', msg);
});

emitter.emit('data', 'First call');
emitter.emit('data', 'Second call');

// Output:
// Regular listener: First call
// One-time listener: First call
// Regular listener: Second call
// (one-time listener doesn't run again)
```

### 💡 When to Use Event Emitters

```
✅ GOOD USE CASES:
──────────────────────────────────────
• Building real-time applications
• Creating plugin systems
• Handling multiple async operations
• Implementing observer pattern
• Building custom streams
• Creating notification systems


❌ DON'T USE FOR:
──────────────────────────────────────
• Simple function calls (just call the function!)
• One-to-one communication (use direct function calls)
• When you need return values (use Promises/async-await)
```

### 🔄 Event Emitter Flow

```
STEP-BY-STEP FLOW:
──────────────────

1. Import EventEmitter
   const EventEmitter = require('events')

2. Create instance
   const emitter = new EventEmitter()

3. Register listeners
   emitter.on('eventName', callback)

4. Emit events
   emitter.emit('eventName', data)

5. Listeners execute automatically
   → Your callback runs with the data
```

---

## 📊 Comparison Summary

### Handling Async Operations

```
┌─────────────┬──────────────┬─────────────┬──────────────┐
│  Method     │  Readability │  Error      │  Best For    │
│             │              │  Handling   │              │
├─────────────┼──────────────┼─────────────┼──────────────┤
│ Callbacks   │     ⭐       │    ⭐       │  Old code    │
│ Promises    │    ⭐⭐⭐     │   ⭐⭐⭐     │  Chains      │
│ Async/Await │   ⭐⭐⭐⭐⭐   │  ⭐⭐⭐⭐⭐   │  Everything! │
└─────────────┴──────────────┴─────────────┴──────────────┘
```

### File Operations

```
┌──────────────┬─────────────────────┬─────────────────────┐
│  Operation   │  Synchronous        │  Asynchronous       │
├──────────────┼─────────────────────┼─────────────────────┤
│  When        │  Blocks code        │  Doesn't block      │
│  Speed       │  Slower overall     │  Faster overall     │
│  Use Case    │  Setup scripts      │  Web servers        │
│  Error       │  Try/catch          │  Callback (err)     │
└──────────────┴─────────────────────┴─────────────────────┘
```

---

## 🎓 Quick Reference Cheat Sheet

### Module System
```javascript
// Export
module.exports = { function1, function2 };

// Import
const myModule = require('./myModule');
```

### Path Module
```javascript
const path = require('path');
path.join('folder', 'file.txt')      // Combine paths
path.dirname(__filename)              // Get directory
path.basename(__filename)             // Get filename
path.extname(__filename)              // Get extension
```

### File System
```javascript
const fs = require('fs');

// Sync
fs.writeFileSync('file.txt', 'data');
const data = fs.readFileSync('file.txt', 'utf8');

// Async
fs.writeFile('file.txt', 'data', (err) => {});
fs.readFile('file.txt', 'utf8', (err, data) => {});
```

### HTTP Server
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});
server.listen(3000);
```

### Async Patterns
```javascript
// Callback
doSomething((err, result) => {});

// Promise
doSomething()
  .then(result => {})
  .catch(err => {});

// Async/Await
async function myFunc() {
  try {
    const result = await doSomething();
  } catch (err) {}
}
```

### Event Emitter
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', (data) => {});    // Listen
emitter.emit('event', data);          // Trigger
```

---

## 🚀 Next Steps

After mastering these concepts, you should learn:

1. **Express.js** - Web framework for Node.js
2. **MongoDB/Mongoose** - Database integration
3. **REST APIs** - Building web APIs
4. **Authentication** - JWT, Sessions, OAuth
5. **Middleware** - Request/response processing
6. **Error Handling** - Production-ready error management
7. **Testing** - Jest, Mocha for testing
8. **Deployment** - Hosting Node.js apps

---

## 💡 Pro Tips

✅ **Always use async/await** instead of callbacks when possible
✅ **Handle errors** with try/catch blocks
✅ **Use environment variables** for configuration
✅ **Never block the event loop** - use async operations
✅ **Use const/let** instead of var
✅ **Modularize your code** - keep files small and focused
✅ **Learn Express.js** - makes building servers much easier

---

## 🎯 Common Mistakes to Avoid

❌ **Not handling errors** in async code
❌ **Using sync methods** in web servers
❌ **Callback hell** - use Promises/async-await instead
❌ **Not closing connections** properly
❌ **Blocking the event loop** with heavy computations
❌ **Not using environment variables** for secrets
❌ **Missing await** keyword with async functions

---

## 📖 Study Plan

**Week 1:** Module System, Path, File System
**Week 2:** HTTP Module, Creating Servers
**Week 3:** Callbacks, Promises
**Week 4:** Async/Await, Event Emitters
**Week 5:** Practice Projects

---

**🎉 Congratulations!**

You now have a complete understanding of Node.js fundamentals. Keep practicing with real projects to solidify your knowledge!

**Remember:**
- Read the code
- Write the code
- Debug the code
- Repeat! 🔄

---

*Happy Coding! 🚀*

**Created for:** Quick revision and interview preparation
**Last Updated:** 2026