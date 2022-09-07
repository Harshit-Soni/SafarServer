import { gql } from "apollo-server-core";

// type User {
//   username: String
//   password: String
//   name: String
//   age: Int
//   joineddate: Date
//   emailid: String
//   dp: String
//   postIdArray: [Int]
//   followinguserarray: [String]
// }
export const userTypeDef = gql`
  type Query {
    _: String
  }
  type Mutation {
    signin(username: String!, password: String!): String!
  }
`;
