//Create License Badge or return empty:

const addLicenseBadge = license => {
  if (license) {
      return `![${license} License](https://img.shields.io/apm/l/readme?logo=readme%20&style=for-the-badge)
`;
  } else {
      return '';
  }
};

//Create Description or return empty:
const createDescription = (title, description, link) => {
  if (link) {
      return `${description}
          
View deployed page here (${title})(${link}).`;
  } else {
      return `${description}`;
  }
};

// Table of Contents based on user selection:

const createTableOfContents = contentArr => {
  let contentList = '';
  contentArr.forEach((item) => {

      // indents 'Screenshots' list item
      if (item.header && item.content === 'Screenshots') {
      contentsList += `   * [${item.header}](#${(item.header).toLowerCase()})
`;
      } else if (item.content) {
          contentList += `* [${item.header}](#${(item.header).toLowerCase().split(' ').join('-')})
`;
      }
  });

  return contentList;

};

// Install Section
const createInstall = install => {
  if (install) {
      return `Please install the following application: 
${install}`
  } else {
      return '';
  }
};
// Create screenshot section
const createScreenshot = screenshotPic => {
  let allScreenshot = '';
  if (screenshotPic) {
      screenshotPic.forEach(screenshot => {
      allScreenshot += `![${screenshot.screenshotAlt}](${screenshot.screenshotLink})
${screenshot.screenshotDesc}
`;
  });
  return `${allScreenshot}`;
  } else {
      return '';
  }
};

// Created with the following "Technologies":
const createTechWith = TechWith =>{
  let allTechnologies = '';

  if (TechWith) {
      techWith.forEach(item => {
          allTechnologies += `
* ${item}`
      });
      return `${allTechnologies}`;
  } else {
      return '';
  };
};

// Create usage and license section
const createUsage = (usage, screenshot) => {
  return `${usage} ${createScreenshot(screenshot)}`
};
const createLicense = license => {
  if (license) {
      return `Application licensed under: ${license}.`;
  } else {
      return '';
  }
};
const createTest = test => {
  if (test) {
      return `If test is needed on the application, please install:

      ${test}

  Once installed, open a terminal or command prompt and enter: \`npm run test\`.`
    } else {
      return '';
  };
};
// create "question(s)" section
const createQuestion = (email, github, repo) => {
  if (email) {
      return `Question(s) about the repo? Please [open an issue](https://github.com/tonyslonaker/Professional-README-Generator/Issues${github}/${repo}/issues) or contact me via email at ${email}. You can find other projects on my GitHub: [${github}](https://github.com/${github}/).`
  } else {
      return '';
  }
};

// Create Markdown for README

function generateMarkdown(md) {
    const { title, github, repo, license } = md
    let readmeContent = '';
    const sectionArr = [
      {
          header: 'Install',
          content: createInstall(md.install)
      },
      {
        header: 'Usage',
        content: createUsage(md.usage)
      },
      {
        header: 'Screenshot', 
        content: createScreenshot(md.screenshot)
      },
      {
        header: 'Tech Created',
        content: createTechWith(md['techwith'])
      },
      {
        header: 'License',
        content: createLicense(license)
      },
      {
        header: 'Contributor', 
        content: md.contributor
      },
      {
        header: 'Tests',
        content: createTest(md.tests)
      },
      {
        header: 'Question(s)',
        content: createQuestion(md.question, github, repo)
      },
];

// If content exists, then add section to README

sectionArr.forEach((sectionItem) => {
  if (sectionItem.content && sectionItem.header === 'screenshot') {
    readmeContent += `### ${sectionItem.header}
    ${sectionItem.content}
    `
            } else if (sectionItem.content) {
            readmeContents += `## ${sectionItem.header}
    ${sectionItem.content}
        
    `;
            }
      });
      return `# ${title}
      ![GitHub issues](https://img.shields.io/github/issues/tonyslonaker/generateMarkdown?color=red)
      [![Issues](https://img.shields.io/github/issues/${github}/${
          repo
        })](https://github.com/tonyslonaker/Professional-README-Generator/issues${github}/${
          repo
        }/issues) [![Issues](https://img.shields.io/github/tonyslonaker/contributors/${
          github
        }/${repo})](https://github.com/tonyslonaker/Professional-README-Generator/${github}/${
          repo
        }/graphs/contributors) ${addLicenseBadge(license)}
      ## Description
      ${createDescription(title, data.description, data.link)}
      ## Contents
      ${createTableOfContents(sectionArr)}
      ${readmeContents}`;
      }

function generateMarkdown(data) {
  return `# ${data.title}

`;
}

module.exports = generateMarkdown;
