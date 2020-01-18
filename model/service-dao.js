import connection from '../infrastructure/mysql-connection';

class ServiceDAO {
  save(service) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO service SET ?';

      connection.query(sql, service, error => {
        if (error) {
          return reject(`Error on saving service: ${error.sqlMessage}`);
        }

        return resolve(service);
      });
    });
  }

  update(id, service) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE service SET ? where id = ?';

      connection.query(sql, [service, id], error => {
        if (error) {
          return reject(`Error on updating service: ${error.sqlMessage}`);
        }

        return resolve(service);
      });
    });
  }

  findAll() {
    const sql = 'SELECT * FROM service';

    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(`Error when getting services from database: ${error.sqlMessage}`);
        }
        return resolve(result);
      });
    });
  }

  findById(id) {
    const sql = 'SELECT * FROM service where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error when getting service with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve(result[0]);
      });
    });
  }

  delete(id) {
    const sql = 'DELETE FROM service where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error deleting service with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve();
      });
    });
  }
}

export default new ServiceDAO();
