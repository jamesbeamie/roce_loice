const Blog = require('../../models/blog');

const blogResolver = {
  blogs: async () => {
    try {
      const blogs = await Blog.find();
      return blogs;
    } catch (err) {
      throw new Error('Blogs not found');
    }
  },
  singleBlog: async (args) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const blog = await Blog.findById(args._id);
      return blog;
    } catch (err) {
      throw new Error('Blog not found');
    }
  },
  createBlog: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const newBlog = new Blog({
      title: args.blogInput.title,
      description: args.blogInput.description,
      tag: args.blogInput.tag,
    });
    try {
      const res = await newBlog.save();
      return res;
    } catch (err) {
      throw new Error('There was a problem creating a blog');
    }
  },
  editBlog: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    // findOneAndUpdate
    // eslint-disable-next-line no-underscore-dangle
    const foundBlog = await Blog.findById(args.updateBlogInput._id);
    // eslint-disable-next-line no-underscore-dangle
    try {
      if (foundBlog) {
        const updating = await Blog.updateOne(
          // condition
          {
            // eslint-disable-next-line no-underscore-dangle
            _id: args.updateBlogInput._id,
          },
          // replacement
          {
            title: args.updateBlogInput.title,
            description: args.updateBlogInput.description,
          },
        );
        return updating;
      }
      throw new Error('Blog not found');
    } catch (err) {
      throw new Error('There was a problem editing the blog');
    }
  },
  deleteBlog: async (args, req) => {
    // findOneAndDelete
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    // eslint-disable-next-line no-underscore-dangle
    const isAvailable = await Blog.findById(args.deleteBlogInput._id);
    try {
      if (isAvailable) {
        // eslint-disable-next-line no-underscore-dangle
        const updatedArray = await Blog.deleteOne({ _id: args.deleteBlogInput._id });
        return updatedArray;
      }
      throw new Error('Blog not found');
    } catch (err) {
      throw new Error('There was a problem deleting a blog');
    }
  },

  filterBytag: async (args) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const blogsfilter = await Blog.find({ tag: args.tag });
      return blogsfilter;
    } catch (err) {
      throw new Error('There was a problem accessing the blog');
    }
  },
};

module.exports = blogResolver;
