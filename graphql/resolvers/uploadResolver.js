const Image = require('../../models/Image');

const uploadResolver = {
  images: async () => {
    try {
      const image = await Image.find();
      return image;
    } catch (err) {
      throw new Error('There was a problem accessing the images');
    }
  },
  uploadFile: async (args) => {
    const image = new Image({

      name: args.file.name,
      type: args.file.type,
      size: args.file.size,
      path: args.file.path,
    });
    const thefile = await image.save();
    return thefile;
  },
};

module.exports = uploadResolver;
