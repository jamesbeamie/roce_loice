const { buildSchema } = require('graphql');

const graphqlSchema = buildSchema(`

    type User{
        _id: ID!
        userName: String!
        email: String!
        password: String!
    }
    input userInput{
        userName: String!
        email: String!
        password: String!
    }

    type rootMutation{
        createUser(userInput: userInput): User
    }


    schema{
        mutation: rootMutation
    }
`);

module.exports = graphqlSchema;
