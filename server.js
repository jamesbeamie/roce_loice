const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const { apolloUploadExpress } = require('apollo-upload-server');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const graphQLSchema = require('./graphql/schema/index');
const rootResolver = require('./graphql/resolvers/index');
// const upload = require('./models/multerSave');

// middleware
const app = express();
app.use(bodyParser.json());
app.use(apolloUploadExpress({ uploadDir: './ ' }));
// app.post('/upload', upload.fields([{ name: 'file' }]));


app.use('/graphql', expressGraphQL({
  schema: graphQLSchema,
  rootValue: rootResolver,
  graphiql: true,
}));

app.use(passport.initialize());

passport.use(new FacebookStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: process.env.FB_CALLBACK_URL,
},
(accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  cb(null, profile);
}));

app.get('/fblogin', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    res.send('authenticated');
  });


// database connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fhwxu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true })
  .then(() => {
    app.listen(8080);
    console.log('connected to server');
  })
  .catch((err) => {
    throw err;
  });
