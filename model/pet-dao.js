import connection from '../infrastructure/mysql-connection';

class PetDAO {
  save(pet) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO pet SET ?';

      connection.query(sql, pet, (error, result) => {
        if (error) {
          return reject(`Error on saving pet: ${error.sqlMessage}`);
        }

        return this.findById(result.insertId)
          .then(newPet => resolve(newPet))
          .catch(error => reject(`Error on saving pet: ${error.sqlMessage}`));
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
    const sql = `SELECT 
                  p.id,
                  p.name,
                  p.type,
                  p.comments,
                  p.client_id,
                  c.name AS owner_name,
                  c.cpf AS owner_cpf
              FROM
                  pet p
                      JOIN
                  client c ON p.client_id = c.id`;

    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(`Error when getting pets from database: ${error.sqlMessage}`);
        }

        const pets = result.map(pet => ({
          id: pet.id,
          name: pet.name,
          type: pet.type,
          comments: pet.comments,
          owner: {
            id: pet.client_id,
            name: pet.owner_name,
            cpf: pet.owner_cpf
          }
        }));

        return resolve(pets);
      });
    });
  }

  findById(id) {
    const sql = `SELECT 
                  p.id,
                  p.name,
                  p.type,
                  p.comments,
                  p.client_id,
                  c.name AS owner_name,
                  c.cpf AS owner_cpf
              FROM
                  pet p
                      JOIN
                  client c ON p.client_id = c.id
                  WHERE p.id = ?`;

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error when getting pet with id: ${id} - Error: ${error.sqlMessage}`);
        }

        const pet = result.map(pet => ({
          id: pet.id,
          name: pet.name,
          type: pet.type,
          comments: pet.comments,
          owner: {
            id: pet.client_id,
            name: pet.owner_name,
            cpf: pet.owner_cpf
          }
        }));

        return resolve(pet);
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
