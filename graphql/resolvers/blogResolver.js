const Blog = require('../../models/blog');

const blogResolver = {
  blogs: async () => {
    try {
      const blogs = await Blog.find();
      return blogs;
    } catch (err) {
      throw err;
    }
  },
  singleBlog: async (args) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const blog = await Blog.findById(args._id);
      return blog;
    } catch (err) {
      throw err;
    }
  },
  createBlog: async (args) => {
    const newBlog = new Blog({
      title: args.blogInput.title,
      description: args.blogInput.description,
    });
    try {
      const res = await newBlog.save();
      return res;
    } catch (err) {
      throw err;
    }
  },
  editBlog: async (args) => {
    // eslint-disable-next-line no-underscore-dangle
    const foundBlog = await Blog.findById(args.updateBlogInput._id);
    // eslint-disable-next-line no-underscore-dangle
    console.log('@@@@@@@@@@@edit', foundBlog);
    try {
      if (foundBlog) {
        const updatedBlog = new Blog({
          // eslint-disable-next-line no-underscore-dangle
          // _id: args.updateBlogInput._id,
          title: args.updateBlogInput.title,
          description: args.updateBlogInput.description,
        });
        const res = await updatedBlog.save();
        return res;
      }
      throw new Error('Not found');
    } catch (err) {
      throw err;
    }
  },
  deleteBlog: async (args) => {
    // eslint-disable-next-line no-underscore-dangle
    const isAvailable = await Blog.findById(args.deleteBlogInput._id);
    try {
      if (isAvailable) {
        // eslint-disable-next-line no-underscore-dangle
        const updatedArray = await Blog.deleteOne({ _id: args.deleteBlogInput._id });
        return updatedArray;
      }
      return 'Blog not found';
    } catch (err) {
      throw err;
    }
  },
};

module.exports = blogResolver;
