
export default `
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    profile: ProfileInput
  }

  input ProfileInput {
    firstName: String
    lastName: String
  }


  type Mutation {
    createUser(input:UserInput!): User
  }
`