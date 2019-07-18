const Blog = require('../../models/blog');

const blogResolver = {
  blogs: async () => {
    try {
      const blogs = await Blog.find();
      return blogs.map(blog => ({
        ...blog,
      }));
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
};

module.exports = blogResolver;
