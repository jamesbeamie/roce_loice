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
    input updatePwdInput{
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
        tag: String! 
    }
    input blogInput{
        title: String!
        description: String!
        tag: String!
    }
    input updateBlogInput{
        _id: ID!
        title: String!
        description: String!
        tag: String!
    }
    input deleteBlogInput{
        _id: ID!
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
        singleBlog(_id: ID!): Blog
        filterBytag(tag: String!): [Blog!]!
        login(email: String!, password: String!): authData
        pwdresetRequest(email: String!): authData
        images: [Img!]!
    }
    type rootMutation{
        createUser(userInput: userInput): User
        resetPwd(updatePwdInput: updatePwdInput): User
        createBlog(blogInput: blogInput): Blog
        editBlog(updateBlogInput: updateBlogInput): Blog
        deleteBlog(deleteBlogInput: deleteBlogInput): Blog
        uploadFile(file: Upload!): Img
    }


    schema{
        mutation: rootMutation
        query: rootQuery
    }
`);

module.exports = graphqlSchema;
