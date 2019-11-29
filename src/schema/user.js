
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

  type RegisterResponse {
    success: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    success: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }


  type Mutation {
    register(input:UserInput!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`