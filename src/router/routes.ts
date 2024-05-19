import express from 'express';
import { UserController } from '../controllers/user';

const router = express.Router();

// User Routes
router.get('/users', UserController.getAllUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users/:id', UserController.getUserById);
router.patch('/users/:id/password', UserController.updatePassword);
router.delete('/users/:id', UserController.deleteUserById);

export default router;
