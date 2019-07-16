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
    type authData{
        userId: ID!
        token: String!
        tokenExpires: Int!
    }
    type rootQuery{
        login(email: String!, password: String!): authData
    }
    type rootMutation{
        createUser(userInput: userInput): User
    }


    schema{
        mutation: rootMutation
        query: rootQuery
    }
`);

module.exports = graphqlSchema;
