const bycript = require('bcrypt');

const User = require('../../models/user');

const userAuth = {
  createUser: async (args) => {
    try {
      const available = await User.findOne({ email: args.userInput.email });
      if (available) {
        throw new Error('User already registered');
      }
      const hashdpwd = await bycript.hash(args.userInput.password, 12);
      const user = new User({
        userName: args.userInput.userName,
        email: args.userInput.email,
        password: hashdpwd,
      });

      const saveuser = user.save();
      return saveuser;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = userAuth;
