export default `
  type User {
    _id: String!
    username: String!
  }

  type Query {
    users: [User!]
    userById(id: Int!): User
  }

  input UserData {
    username: String!
    password: String!
  }

  type Mutation {
    createUser(payload: UserData!): User!
  }
`;
