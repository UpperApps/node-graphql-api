import { GraphQLServer } from 'graphql-yoga';
import connection from './infrastructure/mysql-connection';
import clientDAO from './model/client-dao';

// TODO See how to return a custom error with GraphQL.
// TODO Include Authentication/Authorization
// TODO Separate resolvers and queries in specific files
// TODO See how to implement 12 Factor App methodology with GraphQL/Nodejs (Circuit braker, retry, fallback, etc.)
// TODO Include Typescript to the project

const resolvers = {
  Query: {
    clients: () =>
      clientDAO
        .findAll()
        .then(result => result)
        .catch(error => error),
    client: (root, { id }) =>
      clientDAO
        .findById(id)
        .then(result => result)
        .catch(error => error)
  },
  Mutation: {
    addClient: (root, params) =>
      clientDAO
        .save(params)
        .then(result => result)
        .catch(error => error)
  }
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers
});

connection.connect(error => {
  if (error) {
    console.log('Error when connecting with database.');
    console.log(error);
  } else {
    server.start(() => console.log('Server is running.'));
  }
});
