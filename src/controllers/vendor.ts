import { NextFunction, Request, Response } from 'express';
import VendorModel from '../models/vendor';
import User from '../models/user';

export class VendorController {
  static async getAllVendor(_: unknown, res: Response, next: NextFunction) {
    try {
      const vendors = await VendorModel.findAll();
      return res.status(200).json(vendors);
    } catch (error) {
      next(error);
    }
  }

  static async getVendorById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const vendor = await VendorModel.findByPk(id);
      res.status(200).json(vendor);
    } catch (error) {
      next(error);
    }
  }

  static async createVendor(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, userId } = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        throw {message: 'Not Found'};
      }
      if (user.role !== 'admin') {
        throw {message: 'Unauthorized'};
      }
      const vendor = await VendorModel.create({ name, userId });
      res.status(201).json(vendor);
    } catch (error) {
      next(error);
    }
  }

  static async updateVendor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, userId } = req.body;
      const vendor = await VendorModel.findByPk(id);
      const user = await User.findByPk(userId);
      if (!vendor || !user) {
        throw {message:"Not Found"};
      }
      if (user.role !== 'admin') {
        throw {message: 'Unauthorized'};
      }
      await vendor.update({ name, userId });
      res.status(200).json(vendor);
    } catch (error) {
      next(error);
    }
  }

  static async deleteVendorById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const vendor = await VendorModel.findByPk(id);
      if (!vendor) {
        throw {message: "Not Found"};
      }
      await vendor.destroy();
      res.status(200).json({ message: 'Vendor deleted' });
    } catch (error) {
      next(error);
    }
  }
}