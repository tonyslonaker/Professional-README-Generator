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
          
View the deployed page at [${title}](${link}).`;
  } else {
      return `${description}`;
  }
};

//Table of Contents based on user selection:









function generateMarkdown(data) {
  return `# ${data.title}

`;
}

module.exports = generateMarkdown;
