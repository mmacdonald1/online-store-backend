const { gql } = require('apollo-server-express');
import {User} from './models/User'

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    hello: () => 'world',
    users: () => User.find()
  },
  Mutation:{
    createUser: async (_, {name}) => {
      const person = new User({ name });
      await person.save()
      console.log(person)
      return person
    }
  }
};
