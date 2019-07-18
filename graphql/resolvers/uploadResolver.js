const Image = require('../../models/Image');

const uploadResolver = {
  uploadFile: async (args) => {
    const image = new Image({

      name: args.file.name,
      type: args.file.type,
      size: args.file.size,
      path: args.file.path,
    });
    const thefile = await image.save();
    console.log(thefile);
    return thefile;
  },
};

module.exports = uploadResolver;
