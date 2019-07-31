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
  editBlog: async (args, id) => {
    const foundBlog = await Blog.findById(id);
    try {
      if (foundBlog) {
        const updatedBlog = new Blog({
          _id: id,
          title: args.updateBlogInput.title,
          description: args.updateBlogInput.description,
        });
        const res = await updatedBlog.save();
        return res;
      }
      return 'Blog not found';
    } catch (err) {
      throw err;
    }
  },
  deleteBlog: async (id) => {
    const isAvailable = await Blog.findById(id);
    try {
      if (isAvailable) {
        const blogs = Blog.find();
        const updatedArray = blogs.splice(isAvailable);
        return updatedArray;
      }
      return 'Blog not found';
    } catch (err) {
      throw err;
    }
  },
};

module.exports = blogResolver;
