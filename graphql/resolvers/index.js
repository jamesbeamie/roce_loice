// rootResolver here
const authResolver = require('./userResolver');
const blogResolver = require('./blogResolver');
const uploadResolver = require('./uploadResolver');

const rootResolver = {
  ...authResolver,
  ...blogResolver,
  ...uploadResolver,
};

module.exports = rootResolver;
