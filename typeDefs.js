const { gql } = require('apollo-server-express');

// The GraphQL schema
export const typeDefs = gql`
  type Query {
      "A simple type for getting started!"
      hello: String
      users:[User!]!
    }
  type User {
    id: ID!,
    name: String!
  }
  type Mutation {
    createUser(name: String!): User!
  }
`;
