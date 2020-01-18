import connection from '../infrastructure/mysql-connection';

class PetDAO {
  save(pet) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO pet SET ?';

      connection.query(sql, pet, error => {
        if (error) {
          return reject(`Error on saving pet: ${error.sqlMessage}`);
        }

        return resolve(pet);
      });
    });
  }

  update(id, pet) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE pet SET ? where id = ?';

      connection.query(sql, [pet, id], error => {
        if (error) {
          return reject(`Error on updating pet: ${error.sqlMessage}`);
        }

        return resolve(pet);
      });
    });
  }

  findAll() {
    const sql = 'SELECT * FROM pet';

    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(`Error when getting pets from database: ${error.sqlMessage}`);
        }
        return resolve(result);
      });
    });
  }

  findById(id) {
    const sql = 'SELECT * FROM pet where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error when getting pet with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve(result[0]);
      });
    });
  }

  delete(id) {
    const sql = 'DELETE FROM pet where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error deleting pet with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve();
      });
    });
  }
}

export default new PetDAO();
