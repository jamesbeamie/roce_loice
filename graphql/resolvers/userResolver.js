const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  login: async ({ email, password }) => {
    const presentUser = await User.findOne({ email });
    if (!presentUser) {
      throw new Error('No user');
    }

    const validPwd = bycript.compare(password, presentUser.password);

    if (!validPwd) {
      throw new Error('invalid pwd');
    }

    const userToken = jwt.sign({ userId: presentUser.id, email: presentUser.email },
      'secretkeyfortoken',
      {
        expiresIn: '1hr',
      });

    return {
      userId: presentUser.id,
      token: userToken,
      tokenExpires: 1,
    };
  },
};

module.exports = userAuth;
