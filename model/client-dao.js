import connection from '../infrastructure/mysql-connection';

class ClientDAO {
  save(client) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO client SET ?';

      connection.query(sql, client, error => {
        if (error) {
          return reject(`Error on saving client: ${error.sqlMessage}`);
        }

        return resolve(client);
      });
    });
  }

  update(id, client) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE client SET ? where id = ?';

      connection.query(sql, [client, id], error => {
        if (error) {
          return reject(`Error on updating client: ${error.sqlMessage}`);
        }

        return resolve(client);
      });
    });
  }

  findAll() {
    const sql = 'SELECT * FROM client';

    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(`Error when getting clients from database: ${error.sqlMessage}`);
        }
        return resolve(result);
      });
    });
  }

  findById(id) {
    const sql = 'SELECT * FROM client where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error when getting client with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve(result[0]);
      });
    });
  }

  delete(id) {
    const sql = 'DELETE FROM client where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error deleting client with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve();
      });
    });
  }
}

export default new ClientDAO();
