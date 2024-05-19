import { Request, Response } from 'express';
import BookingModel from '../models/booking';

export class BookingController {
  static async getAllBooking(_: unknown, res: Response) {
    try {
      const bookings = await BookingModel.findAll();
      return res.status(200).json(bookings);
    } catch (error) {
      throw error;
    }
  }

  static async getBookingById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await BookingModel.findByPk(id);
      res.status(200).json(booking);
    } catch (error) {
      throw error;
    }
  }

  static async createBooking(req: Request, res: Response) {
    try {
      const { dateBooked, dateReturned, carId, userId } = req.body;
      const booking = await BookingModel.create({ dateBooked, dateReturned, carId, userId });
      res.status(201).json(booking);
    } catch (error) {
      throw error;
    }
  }

  static async updateBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { dateBooked, dateReturned, carId, userId } = req.body;
      await BookingModel.update({ dateBooked, dateReturned, carId, userId }, { where: { id } });
      res.status(200).json({ message: "Booking updated successfully" });
    } catch (error) {
      throw error;
    }
  }

  static async deleteBookingById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await BookingModel.destroy({ where: { id } });
      res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      throw error;
    }
  }
}