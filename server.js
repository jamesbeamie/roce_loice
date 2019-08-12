const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const { apolloUploadExpress } = require('apollo-upload-server');
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook');
// const expresshandlebars = require('express-handlebars');
// const nodemailer = require('nodemailer');

const graphQLSchema = require('./graphql/schema/index');
const rootResolver = require('./graphql/resolvers/index');
// const upload = require('./models/multerSave');
const isAuth = require('./middleware/isAuth');

// middleware
const app = express();
app.use(bodyParser.json());
app.use(apolloUploadExpress({ uploadDir: './ ' }));
// app.post('/upload', upload.fields([{ name: 'file' }]));

// authentication middleware
app.use(isAuth);

app.use(
  '/photography',
  expressGraphQL({
    schema: graphQLSchema,
    rootValue: rootResolver,
    graphiql: true,
  }),
);

// database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fhwxu.mongodb.net/${process.env
      .MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
  )
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log('connected to server');
  })
  .catch((err) => {
    throw err;
  });
