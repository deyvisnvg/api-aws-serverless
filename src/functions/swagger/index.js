const fs = require('fs');
const yaml = require('yaml');

const openapi = yaml.parse(fs.readFileSync('./config/openapi.yml', 'utf8'));

exports.swagger = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(openapi),
  };
};
