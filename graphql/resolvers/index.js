// rootResolver here
const authResolver = require('./userResolver');

const rootResolver = {
  ...authResolver,
};

module.exports = rootResolver;
