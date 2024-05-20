import { NextFunction, Request, Response } from 'express';
import BookingModel from '../models/booking';
import Car from '../models/car';

export class BookingController {
  static async getAllBooking(_: unknown, res: Response, next: NextFunction) {
    try {
      const bookings = await BookingModel.findAll();
      return res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  }

  static async getBookingById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const booking = await BookingModel.findByPk(id);
      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }

  static async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { dateBooked, dateReturned, carId, userId } = req.body;
      const car = await Car.findByPk(carId);
      if (car?.isRented) {
        throw {message: "Car is rented"}
      }
      const booking = await BookingModel.create({ dateBooked, dateReturned, carId, userId });
      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  }

  static async updateBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { dateBooked, dateReturned, carId, userId } = req.body;
      await BookingModel.update({ dateBooked, dateReturned, carId, userId }, { where: { id } });
      res.status(200).json({ message: "Booking updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookingById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await BookingModel.destroy({ where: { id } });
      res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}