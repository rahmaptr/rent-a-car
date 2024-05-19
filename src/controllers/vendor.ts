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
        return res.status(400).json({ message: 'User not found' });
      }
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
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
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
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
        return res.status(404).json({ message: 'Vendor not found' });
      }
      await vendor.destroy();
      res.status(200).json({ message: 'Vendor deleted' });
    } catch (error) {
      next(error);
    }
  }
}