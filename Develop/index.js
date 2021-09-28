//Packages needed for application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./Develop/utilities/generateMarkdown.js');

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
    },
    {
        name: 'repo',
        type: 'repo input',
        message: 'What is the name of your repo? (required)',
        validate:repoInput => {
            if (repoInput) {
                return true;
            } else {
                console.log('Please provide the repo name.')
            }
        }
    },
    {
        name: 'content',
        type: 'input content',
        message: 'Are there any additional section(s) that you would like to include?',
        choices: [
            {
                name: 'Deployed Application',
                checked: false
            },
            {
                name: 'Install',
                checked: false
            },
            {
                name: 'Screenshot',
                checked: true
            },
            {
                name: 'Built With',
                checked: true
            },
            {
                name: 'License',
                checked: false
            },
            {
                name: 'Contributing',
                checked: false
            },
            {
                name: 'Test',
                checked: false
            },
            {
                name: 'Question(s)',
                checked: true
            },
            {
                name: 'Credits',
                checked: false
            },
        ]
    },
    {
        name: 'link input',
        type: 'input',
        message: 'Link to your deployed application.',
        when: ({ contents }) => {
            if (contents.indexOf('Deployed Application') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Enter a valid link...');
                return false;
            }
        }
    },
    {
        name: 'install',
        type: 'input',
        message: 'Are there any required packages for the install of your application?',
        when: ({ contents }) => {
            if (contents.indexOf('Installation') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter required install instructions or packages!');
                return false;
            }
        }
    },
    {
        name: 'license',
        type: 'license list',
        message: 'Please choose or provide license information.',
        choices: ['ISC', 'GNU', 'MIT'],
        default: 0,
        When: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Did you forget your license information?');
                return false;
            }
        }
    }, 
    {
        type: 'checkbox',
        name: 'techCreated',
        message: 'Select all technologies that the application was built with.',
        choices: ['Node.js', 'CSS', 'Express.js', 'JavaScript', 'CSS', 'HTML'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('techCreated') > -1) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please enter test information for your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('What packages are required to run tests for your application?');
                return false;
            }
        }
    },
    {
        name: 'questions',
        type: 'input',
        message: 'Please input valid email address.',
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please provide an email address!');
                return false;
            }
        }
    }
];

// Prompts for adding screenshot(s)
const screenshotQues = [
    {
        name: 'screenshotLink',
        type: 'input',
        message: 'Provide the link to your screenshot. (Required)',
        validate: screenshotLinkInput => {
            if (screenshotLinkInput) {
                return true;
            } else {
                console.log('Did you forget the link?')
                return false;
            }
        }
    },
    {
        name: 'screenshotAlt',
        type: 'input',
        message: 'Alternate text for your screenshot. (Required)',
        validate: screenshotAltInput => {
            if (screenshotAltInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        name: 'screenshotDesc',
        type: 'input',
        message: 'Provide a description of your screenshot. (Optional)'
    },
    {
        name: 'confirmAddScreenshot',
        type: 'confirm',
        message: 'Any additional screenshots that you would like to provide?',
        default: false
    }
];
// Credit Prompts
const creditQues = [
    {
        name: 'creditName',
        type: 'input',
        message: 'Please provide a name for your credit. (Required)',
        validate: creditName => {
            if (creditName) {
                return true;
            } else {
                console.log('Please provide a name for your credit.');
                return false;
            }
        }
    },
    {
        name: 'creditLink',
        type: 'input',
        message: 'What is the link for the credit provided? (Required)',
        validate: creditLink => {
            if (creditLink) {
                return true;
            } else {
                console.log('Link for credit provided...');
                return false;
            }
        }
    },
    {
        name: 'confirmAddCredit',
        type: 'confirm',
        message: 'Any additional credit(s)?',
        default: false
    }
]
// add screenshots: recursive function
addScreenshots = readmeData => {
    
    // array for screenshot
    if (!readmeData.screenshot) {
        readmeData.screenshot = [];
    }
    console.log(`
--------------
New Screenshot
--------------
    `);
    return inquirer.prompt(screenshotQues)
    .then(screenshotData => {
        // add screenshot to the array
        readmeData.screenshot.push(screenshotData);
        // based on user input, call addScreenshots again
        if (screenshotData.confirmAddScreenshot) {
            return addScreenshots(readmeData);
        } else {
            return readmeData;
        };
    });
};
// recursive function: credits
addCredits = readmeInfo => {
    
    // initiates array for credits
    if (!readmeInfo.credits) {
        readmeInfo.credits = [];
    };
    console.log(`
----------
New Credit
----------
    `);
    return inquirer.prompt(creditQues)
    .then(creditData => {
        // add credit(s) to array
        readmeInfo.credits.push(creditData);
        // based on user input, call addCredits again 
        if (creditData.confirmAddCredit) {
            return addCredits(readmeInfo);
        } else {
            return readmeInfo;
        }
    });
};
// function: README file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log('README created!')
    });
};
// initialize program
function init() {
    return inquirer.prompt(questions);
};
// initialize program - function
init()
    .then(userResponse => { 
        // based on user selection, call a function to add screenshots
        if (userResponse.contents.indexOf('Screenshots') > -1) {
            return addScreenshots(userResponse);
        } else {
            return userResponse;
        }
    })
    .then(response => {
        // based on user selection, call function to add credits
        if (response.contents.indexOf('Credits') > -1) {
            return addCredits(response);
        } else {
            return response;
        }
    })
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });
