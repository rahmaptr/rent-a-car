import { NextFunction, Request, Response } from 'express';
import CarModel from '../models/car';
import Booking from '../models/booking';

export class CarController {
  static async getAllCar(_: unknown, res: Response, next: NextFunction) {
    try {
      const cars = await CarModel.findAll();
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }

  static async getCarById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const car = await CarModel.findByPk(id);
      res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }

  static async createCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, capacity, price, vendorId } = req.body;
      const car = await CarModel.create({ name, capacity, price, vendorId, isRented: false});
      res.status(201).json(car);
    } catch (error) {
      next(error);
    }
  }

  static async updateCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, capacity, price, vendorId, isRented } = req.body;
      await CarModel.update({ name, capacity, price, vendorId, isRented }, { where: { id } });
      res.status(200).json({ message: "Car updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async updateCarRentedStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { isRented } = req.body;
      const booking = await Booking.findOne({ where: { carId: id}})
      if (!booking?.dateReturned) {
        throw {message:"Car hasn't been returned"}
      }
      await CarModel.update({ isRented }, { where: { id } });
      res.status(200).json({ message: "Car rented status updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCarById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await CarModel.destroy({ where: { id } });
      res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}