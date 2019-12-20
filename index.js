// Packages we need
var fs = require('fs'); // Creates our file
var inquirer = require('inquirer'); // The engine for our questions prompt
var slugify = require('slugify'); // Will turn a string into a usable filename

// The questions
var questions = [
  {
    type: 'input',
    name: 'link',
    message: 'What is the url?',
  },
  {
    type: 'input',
    name: 'title',
    message: 'What is the title?',
  },
  {
    type: 'checkbox',
    name: 'tags',
    message: 'Would you like me to add any tags?',
    choices: [
      { name: 'frontend' },
      { name: 'backend' },
      { name: 'security' },
      { name: 'design' },
      { name: 'process' },
      { name: 'business' },
    ],
  },
  {
    type: 'input',
    name: 'description',
    message: 'How about a description?',
  },
];

// Confirmation questions
var confirm = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Does this look good?',
  },
];

// The questions prompt
function askQuestions() {

  // Say hello
  console.log('🐿  Oh, hello! Found something you want me to bookmark?\n');

  // Ask questions
  inquirer.prompt(questions).then((answers) => {

    // Things we'll need to generate the output
    var title = answers.title;
    var link = answers.link;
    var tags = answers.tags + '';
    var description = answers.description;
    var output = '---\n' +
                 'title: "' + title + '"\n' +
                 'link: "' + link + '"\n' +
                 'tags: [' + tags + ']\n' +
                 '---\n' + description + '\n';

    // Finished asking questions, show the output
    console.log('\n🐿  All done! Here is what I\'ve written down:\n');
    console.log(output);

    inquirer.prompt(confirm).then(answers => {

      // Things we'll need to generate the filename
      var slug = slugify(title);
      var filename = '_bookmarks/' + slug + '.md';

      if (answers.confirm) {
        // Save output into file
        fs.writeFile(filename, output, function () {
          console.log('\n🐿  Great! I have saved your bookmark to ' + filename);
        });
      } else {
        // Ask the questions again
        console.log('\n🐿  Oops, let\'s try again!\n');
        askQuestions();
      }

    });

  });
}

// Kick off the questions prompt
askQuestions();