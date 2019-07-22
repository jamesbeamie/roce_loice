const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Image', imageSchema);
