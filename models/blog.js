const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Blog', blogSchema);
