import connection from '../infrastructure/mysql-connection';

class AppointmentDAO {
  save(appointment) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO appointment SET ?';

      connection.query(sql, appointment, error => {
        if (error) {
          return reject(`Error on saving appointment: ${error.sqlMessage}`);
        }

        return resolve(appointment);
      });
    });
  }

  update(id, appointment) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE appointment SET ? where id = ?';

      connection.query(sql, [appointment, id], error => {
        if (error) {
          return reject(`Error on updating appointment: ${error.sqlMessage}`);
        }

        return resolve(appointment);
      });
    });
  }

  findAll() {
    const sql = 'SELECT * FROM appointment';

    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(`Error when getting appointments from database: ${error.sqlMessage}`);
        }
        return resolve(result);
      });
    });
  }

  findById(id) {
    const sql = 'SELECT * FROM appointment where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error when getting appointment with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve(result[0]);
      });
    });
  }

  findByClientId(client_id) {
    const sql = 'SELECT * FROM appointment where client_id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, client_id, (error, result) => {
        if (error) {
          return reject(`Error when getting appointment with client id: ${client_id} - Error: ${error.sqlMessage}`);
        }
        return resolve(result);
      });
    });
  }

  delete(id) {
    const sql = 'DELETE FROM appointment where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error deleting appointment with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve();
      });
    });
  }
}

export default new AppointmentDAO();
