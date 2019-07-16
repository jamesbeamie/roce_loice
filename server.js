const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const rootResolver = require('./graphql/resolvers/index');

// middleware
const app = express();
app.use(bodyParser.json());


app.use('/graphql', expressGraphQL({
  schema: graphQLSchema,
  rootValue: rootResolver,
  graphiql: true,
}));

// app.listen(8080, () => {
//   console.log('Running on 8080');
// });

// database connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fhwxu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true })
  .then(() => {
    app.listen(8080);
    console.log('connected to server');
  })
  .catch((err) => {
    throw err;
  });
