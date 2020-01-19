import { GraphQLServer } from 'graphql-yoga';
import connection from './infrastructure/mysql-connection';
import clientDAO from './model/client-dao';

const resolvers = {
  Query: {
    clients: () =>
      clientDAO
        .findAll()
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
