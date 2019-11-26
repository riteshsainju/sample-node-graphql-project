import express from 'express';

import { ApolloServer,gql } from 'apollo-server-express';


// import typeDefs from './schema';
// import resolvers from './resolvers';

const app = express();
const schema = gql`
  type Query {
    me: User
  }
  type User {
    username: String!
  }
`;
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Ritesh Sainju',
      };
    },
  },
};

const server = new ApolloServer({ typeDefs:schema, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
)