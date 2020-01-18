import appointmentDAO from './appointment-dao';
import moment from 'moment';

class AppointmentService {
  save(appointment) {
    return new Promise((resolve, reject) => {
      const errors = this.validate(appointment);

      if (errors.length > 0) {
        return reject(errors.map(error => error.message));
      }

      appointmentDAO
        .save(appointment)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  update(id, appointment) {
    return new Promise((resolve, reject) => {
      const errors = this.validate(appointment);

      if (errors.length > 0) {
        return reject(errors.map(error => error.message));
      }

      appointmentDAO
        .update(id, appointment)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      appointmentDAO
        .delete(id)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      appointmentDAO
        .findAll()
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      appointmentDAO
        .findById(id)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  findByClientId(client_id) {
    return new Promise((resolve, reject) => {
      appointmentDAO
        .findByClientId(client_id)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  validate(fields) {
    const { date_appointment } = fields;

    const isDateValid = moment(date_appointment).isSameOrAfter(moment());

    const validations = [
      {
        name: 'date',
        isValid: isDateValid,
        message: 'Date must be higher or equal than the current date'
      }
    ];

    return validations.filter(input => !input.isValid);
  }
}

export default new AppointmentService();
