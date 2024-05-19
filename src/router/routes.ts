import express from 'express';
import { UserController } from '../controllers/user';
import { VendorController } from '../controllers/vendor';

const router = express.Router();

// User Routes
router.get('/users', UserController.getAllUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users/:id', UserController.getUserById);
router.patch('/users/:id/password', UserController.updatePassword);
router.delete('/users/:id', UserController.deleteUserById);

// Vendor Routes
router.get('/vendors', VendorController.getAllVendor);
router.get('/vendors/:id', VendorController.getVendorById);
router.post('/vendors', VendorController.createVendor);
router.put('/vendors/:id', VendorController.updateVendor);
router.delete('/vendors/:id', VendorController.deleteVendorById);

export default router;
