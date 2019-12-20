// Packages we need
var fs = require('fs'); // Creates our file (part of Node.js so doesn't need installing)
var inquirer = require('inquirer'); // The engine for our questions prompt
var slugify = require('slugify'); // Will turn a string into a usable filename

// The questions
var questions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  },
];

// The questions prompt
function askQuestions() {

  // Ask questions
  inquirer.prompt(questions).then(answers => {

    // Things we'll need to generate the output
    var name = answers.name;

    // Finished asking questions, show the output
    console.log('Hello ' + name + '!');

  });

}

// Kick off the questions prompt
askQuestions();