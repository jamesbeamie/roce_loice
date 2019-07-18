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

    type Blog{
        _id: ID!
        title: String!
        description: String!
    }
    input blogInput{
        title: String!
        description: String!
    }
    
    type Img{
        _id: ID!
        name: String!
        type: String!
        size: Int!
        path: String!
    }
    input Upload{
        name: String!
        type: String!
        size: Int!
        path: String!
    }

    type rootQuery{
        blogs: [Blog!]!
        login(email: String!, password: String!): authData
    }
    type rootMutation{
        createUser(userInput: userInput): User
        createBlog(blogInput: blogInput): Blog
        uploadFile(file: Upload!): Img
    }


    schema{
        mutation: rootMutation
        query: rootQuery
    }
`);

module.exports = graphqlSchema;
