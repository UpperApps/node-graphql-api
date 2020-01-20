import { GraphQLServer } from 'graphql-yoga';
import connection from './infrastructure/mysql-connection';
import clientDAO from './model/client-dao';

// TODO See how to return a custom error with GraphQL.
// TODO Include Authentication/Authorization
// TODO Separate resolvers and queries in specific files
// TODO See how to implement 12 Factor App methodology with GraphQL/Nodejs (Circuit braker, retry, fallback, etc.)
// TODO Include Typescript to the project
// TODO Include input validations

const resolvers = {
  Query: {
    clients: () =>
      clientDAO
        .findAll()
        .then(result => result)
        .catch(error => new Error(error)),
    client: (root, { id }) =>
      clientDAO
        .findById(id)
        .then(result => result)
        .catch(error => new Error(error))
  },
  Mutation: {
    addClient: (root, param) =>
      clientDAO
        .save(param.client)
        .then(result => result)
        .catch(error => new Error(error)),
    updateClient: (root, param) =>
      clientDAO
        .update(param.id, param.client)
        .then(result => result)
        .catch(error => new Error(error)),
    deleteClient: (root, { id }) =>
      clientDAO
        .delete(id)
        .then(() => `Client with id ${ id } was removed.`)
        .catch(error => new Error(error))
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
