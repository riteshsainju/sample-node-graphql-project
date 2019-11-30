import express from 'express';
import { ApolloServer,gql } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import models from './models';

const SECRET = 'asiodfhoi1hoi23jnl1kejd';
const SECRET2 = 'asiodfhoi1hoi23jnl1kejasdjlkfasdd';

const app = express();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const checkToken = async (req) => {
  const authToken = req.headers.authorization;
  if (authToken) {
  const token = authToken.split(' ')[1];
  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
  } catch (err) {
  }
}
  req.next();
};

app.use(cors('*'));
app.use(checkToken);

const server = new ApolloServer({ typeDefs, resolvers, context: ({req}) =>{
  return ({
  models,
  user: req.user,
  SECRET,
  SECRET2,
})
}
});

server.applyMiddleware({ app });


models.sequelize.sync({}).then(() => {
  app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
)});