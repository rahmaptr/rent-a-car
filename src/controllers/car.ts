import { Request, Response } from 'express';
import CarModel from '../models/car';

export class CarController {
  static async getAllCar(_: unknown, res: Response) {
    try {
      const cars = await CarModel.findAll();
      return res.status(200).json(cars);
    } catch (error) {
      throw error;
    }
  }

  static async getCarById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const car = await CarModel.findByPk(id);
      res.status(200).json(car);
    } catch (error) {
      throw error;
    }
  }

  static async createCar(req: Request, res: Response) {
    try {
      const { name, capacity, price, vendorId } = req.body;
      const car = await CarModel.create({ name, capacity, price, vendorId, isRented: false});
      res.status(201).json(car);
    } catch (error) {
      throw error;
    }
  }

  static async updateCar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, capacity, price, vendorId, isRented } = req.body;
      await CarModel.update({ name, capacity, price, vendorId, isRented }, { where: { id } });
      res.status(200).json({ message: "Car updated successfully" });
    } catch (error) {
      throw error;
    }
  }

  static async updateCarRentedStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { isRented } = req.body;
      await CarModel.update({ isRented }, { where: { id } });
      res.status(200).json({ message: "Car rented status updated successfully" });
    } catch (error) {
      throw error;
    }
  }

  static async deleteCarById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await CarModel.destroy({ where: { id } });
      res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
      throw error;
    }
  }
}