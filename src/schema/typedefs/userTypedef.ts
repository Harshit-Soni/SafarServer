import { gql } from "apollo-server-core";

export const userTypeDef = gql`
  type User {
    username: String
    password: String
    name: String
    age: Int
    joineddate: Timestamp
    emailId: String
    dp: String
    postIdArray: [Int]
    followinguserarray: [String]
  }

  type Query {
    getUser(username: String!): User
  }
  type Mutation {
    signin(username: String!, password: String!): String!
    signup(
      username: String!
      password: String!
      name: String!
      emailId: String!
      age: Int!
    ): String!
  }
`;
