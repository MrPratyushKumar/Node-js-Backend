const lodash = require('lodash');

const names = ["pratyush", "Pandey","utkarsh","adrsh"];

const capitalize = lodash.map(names , lodash.capitalize)
console.log(capitalize);




// Notes:

// What Npm?
// npm is a default package manager for node js , you insatll , and manage third party package like tools and every thing , You can manage you project dependencies , you can run scripts that you are define in your package.json file,also you can publish your own package

// Npm key commands:
// create package.json-> npm init or npm init -y

// Diff b/w dependency vs devDependency
// Dependency are all the packages that is require for your apllication to run 
// On the other hand devdependency is the name suggest that is for your local development and testing
