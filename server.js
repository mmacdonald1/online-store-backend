const express = require('express')
const stripe = require('stripe')('sk_test_6fcuR0Yuy1IqFzotfi5AH7W100hVl0GzkV')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');


const startServer = async () => {
  // create express instance
  const app = express();

//set up ApolloServer
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
  });

  // Apply apollo middleware to express server
  server.applyMiddleware({ app }); // app is from an existing express app


  //Set up proxy and CORS to avoid CORS errors
  app.set('trust proxy', true)
  const corsOptions = {
    origin:'http://localhost:3000', //the port my react app is running on.
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(require("body-parser").text());

  //wait for mongoose connection to the database to resolve
  await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

  //stripe api request
  app.post("/charge", async (req, res) => {
    console.log('hit charge', req.body)
    try {
      let {status} = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });

      res.json({status});
    } catch (err) {
      console.log(err)
      res.status(500).end();
    }
  });


  app.listen({port: 5000}, ()=>{
    console.log('server started on port ' + server.graphqlPath)
  })
}

startServer()
