import { gql } from "apollo-server-core";

export const userTypeDef = gql`
  type User {
    name: String
    age: Int
  }
  type Users {
    users: [User]
  }
  type Query {
    getAllUsers: [User]
    getUserById(id: String): User
  }
`;
