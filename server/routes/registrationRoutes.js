import express from 'express';
import { createRegistration, getRegistrationStatus } from '../controllers/registrationController.js';

const router = express.Router();

// Public routes for delegates
router.post('/', createRegistration);
router.get('/:id', getRegistrationStatus);

export default router;
