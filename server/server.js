const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// I think I did this- if we're in production, serve client/build as static assets
// Serve static assets first
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Apply middleware to parse JSON requests
app.use(express.json());

// Apply the Apollo Server middleware to Express at a specific endpoint
server.applyMiddleware({ app, path: '/graphql' });

// Define a route for non-GraphQL requests
app.get('/', (req, res) => {
  res.send('Welcome to my Apollo Server integrated with Express!');
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
