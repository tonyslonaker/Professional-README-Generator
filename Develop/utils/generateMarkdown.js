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

// creates installation section
const createInstallation = install => {
  if (install) {
      return `To use this application, please install: 
${install}`
  } else {
      return '';
  }
};
// creates screenshot section
const createScreenshots = screenshotItem => {
  let allScreenshots = '';
  if (screenshotItem) {
      screenshotItem.forEach(screenshot => {
      allScreenshots += `![${screenshot.screenshotAlt}](${screenshot.screenshotLink})
${screenshot.screenshotDesc}
`;
  });
  return `${allScreenshots}`;
  } else {
      return '';
  }
};

//Built with the following "Technologies" section:
const createBuiltWith = builtWith =>{
  let allTechnologies = '';

  if (builtWith) {
      builtWith.forEach(item => {
          allTechnologies += `
* ${item}`
      });
      return `${allTechnologies}`;
  } else {
      return '';
  };
};

// creates usage section
const createUsage = (usage, screenshots) => {
  return `${usage} ${createScreenshots(screenshots)}`
};
// creates license section
const createLicense = license => {
  if (license) {
      return `This application is licensed under the ${license} license.`;
  } else {
      return '';
  }
};
const createTest = test => {
  if (test) {
      return `To run tests on the application, install
\`\`\`
${test}
\`\`\`
and run \`npm run test\` from the command line.`
  } else {
      return '';
  };
};
// creates questions section
const createQuestions = (email, github, repo) => {
  if (email) {
      return `If you have any questions about the repo, please [open an issue](https://github.com/${github}/${repo}/issues) or contact me via email at ${email}. You can find more of my work on my GitHub, [${github}](https://github.com/${github}/).`
  } else {
      return '';
  }
};







function generateMarkdown(data) {
  return `# ${data.title}

`;
}

module.exports = generateMarkdown;
