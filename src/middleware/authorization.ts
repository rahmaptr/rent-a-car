import { Request, Response, NextFunction } from 'express';
import Vendor from '../models/vendor';
import User from '../models/user';

interface RequestWithUser extends Request {
  user?: User;
}

export async function authorization(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const vendor = await Vendor.findOne({ where: { userId: req.user!.id } });
    if (!vendor) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  } catch (error) {
    next(error);
  }
}