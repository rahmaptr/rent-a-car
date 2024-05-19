import express from 'express';
import { UserController } from '../controllers/user';
import { VendorController } from '../controllers/vendor';
import { CarController } from '../controllers/car';
import { BookingController } from '../controllers/booking';
import { authentication } from '../middleware/authentication';
import { authorization } from '../middleware/authorization';

const router = express.Router();

// User Routes without authentication
router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(authentication);

// Booking Routes
router.get('/bookings', BookingController.getAllBooking);
router.post('/bookings', BookingController.createBooking);
router.get('/bookings/:id', BookingController.getBookingById);
router.put('/bookings/:id', BookingController.updateBooking);
router.delete('/bookings/:id', BookingController.deleteBookingById);

router.get('/users', UserController.getAllUser);
router.get('/users/:id', UserController.getUserById);
router.patch('/users/:id/password', UserController.updatePassword);
router.delete('/users/:id', UserController.deleteUserById);

router.use(authorization);

// Vendor Routes
router.get('/vendors', VendorController.getAllVendor);
router.get('/vendors/:id', VendorController.getVendorById);
router.post('/vendors', VendorController.createVendor);
router.put('/vendors/:id', VendorController.updateVendor);
router.delete('/vendors/:id', VendorController.deleteVendorById);

// Car Routes
router.get('/cars', CarController.getAllCar);
router.post('/cars', CarController.createCar);
router.get('/cars/:id', CarController.getCarById);
router.put('/cars/:id', CarController.updateCar);
router.delete('/cars/:id', CarController.deleteCarById);
router.patch('/cars/:id/rented', CarController.updateCarRentedStatus);

export default router;
