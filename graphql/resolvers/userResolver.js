/* eslint-disable quotes */
const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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

    const validPwd = await bycript.compare(password, presentUser.password);
    if (!validPwd) {
      throw new Error('invalid pwd');
    }
    const userToken = jwt.sign({ userId: presentUser.id, email: presentUser.email }, 'secretkeyfortoken', {
      expiresIn: '1hr',
    });

    return {
      userId: presentUser.id,
      token: userToken,
      tokenExpires: 1,
    };
  },
  pwdresetRequest: async ({ email }) => {
    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
      const token = crypto.randomBytes(12).toString('hex');
      registeredUser.update({
        resetPwdToken: token,
        resetPwdTokenExpires: Date.now + 360000,
      });
    } else {
      return Error('User Not found');
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'wafulajames9@gmail.com',
        pass: 'manchester10',
      },
    });
    const meailOptions = {
      from: `wafulajames9@gmail.com`,
      to: `${registeredUser.email}`,
      subject: `Password reset`,
      text:
				`Hi Rose, this is a royalframes email link to reset your password\n\n`
				+ `http://localhost:8080/graphql?query=mutation%7B%0A%20%20resetPwd(updatePwdInput%3A%7Bpassword%3A%20%22password1%22%7D)%7B%0A%20%20%20%20userName%0A%20%20%7D%0A%7D%0A`,
    };
    // I will add a frontend link to reset password
    return transporter.sendMail(meailOptions, (err, response) => {
      if (err) {
        throw new Error(err);
      }
      return response;
    });
  },

  resetPwd: async (args) => {
    const hashdpwd = await bycript.hash(args.updatePwdInput.password, 12);
    const resetPassword = await User.updateOne(
      // condition
      {
        email: 'james@gmail.com',
      },
      // replacement
      {
        password: hashdpwd,
      },
    );
    return resetPassword;
  },
};

module.exports = userAuth;
