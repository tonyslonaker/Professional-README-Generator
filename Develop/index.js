//Packages needed for application
const generateMarkdown = require('./utilities/generateMarkdown.js');
const inquirer = require('inquirer');
const fs = require('fs');

//Array of questions for user input
const questions = [
    {
        name: 'title',
        type: 'input',
        message: 'Project Title: (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please input Project Title')
                return false;
            }
        }
    },
    {
        name: 'github',
        type: 'input',
        message: 'Enter your GitHub username: (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username...');
                return false;
            }
        }
    }

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
