import { Response } from 'express';
import { Model } from "sequelize/types";
import User as Model from '../../models/user.js';
export class UserController {
  static async getAllUser(_: any, res: Response) {
    const users = await Model.findAll(); // Access the static member 'findAll' of the 'Model' class
    res.status(200).json(users);
  }
}