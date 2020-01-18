import { GraphQLServer } from 'graphql-yoga';
import connection from './infrastructure/mysql-connection';

const resolvers = {
  Query: {
    status: () => 'Server is running!'
  },
  Mutation: {
    addClient: (root, params) => ({
      id: 1,
      name: params.name,
      cpf: params.cpf
    })
  }
}

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
