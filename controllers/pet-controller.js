import petDAO from '../model/pet-dao';
import validateInputs from '../validations/validate-inputs';
import { nameValidations, idGETValidations, idValidations } from '../validations/pet-validations';
import express from 'express';

const router = express.Router();

router.get('/:client_id/pets', (req, res) => {
  petDAO
    .findAll()
    .then(appointments => res.json(appointments))
    .catch(error => res.status(404).json(error));
});

router.get('/:client_id/pets/:id', [...idGETValidations], (req, res) => {
  validateInputs(req, res);

  const id = req.params.id;

  petDAO
    .findById(id)
    .then(appointments => res.json(appointments))
    .catch(error => res.status(404).json(error));
});

router.delete('/:client_id/pets/:id', [...idValidations], (req, res) => {
  validateInputs(req, res);
  const id = req.params.id;

  petDAO
    .delete(id)
    .then(res.status(204).end())
    .catch(error => res.status(404).json(error));
});

router.put('/:client_id/pets/:id', [...idValidations, nameValidations], (req, res) => {
  validateInputs(req, res);

  const id = req.params.id;

  petDAO
    .update(id, req.body)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(404).json(error));
});

router.post('/:client_id/pets', [nameValidations], (req, res) => {
  validateInputs(req, res);

  const client_id = req.params.client_id;
  const pet = { ...req.body, client_id };

  petDAO
    .save(pet)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(404).json(error));
});

export default router;
