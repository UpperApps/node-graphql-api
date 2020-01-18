import appointmentService from '../model/appointment-service';
import validateInputs from '../validations/validate-inputs';
import { dateAppointmentValidations, idGETValidations, idValidations } from '../validations/appointment-validations';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  appointmentService
    .findAll()
    .then(appointments => res.json(appointments))
    .catch(error => res.status(404).json(error));
});

router.get('/:id', [...idGETValidations], (req, res) => {
  validateInputs(req, res);

  const id = req.params.id;

  appointmentService
    .findById(id)
    .then(appointments => res.json(appointments))
    .catch(error => res.status(404).json(error));
});

router.get('/clients/:id', [...idGETValidations], (req, res) => {
  validateInputs(req, res);

  const id = req.params.id;

  appointmentService
    .findByClientId(id)
    .then(appointments => res.json(appointments))
    .catch(error => res.status(404).json(error));
});

router.delete('/:id', [...idValidations], (req, res) => {
  validateInputs(req, res);
  const id = req.params.id;

  appointmentService
    .delete(id)
    .then(res.status(204).end())
    .catch(error => res.status(404).json(error));
});

router.put('/:id', [...idValidations, ...dateAppointmentValidations], (req, res) => {
  validateInputs(req, res);

  const id = req.params.id;

  appointmentService
    .update(id, req.body)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(404).json(error));
});

router.post('/', [...dateAppointmentValidations], (req, res) => {
  validateInputs(req, res);

  appointmentService
    .save(req.body)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(404).json(error));
});

export default router;
