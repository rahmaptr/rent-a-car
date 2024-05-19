import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export class UserController {
  static async getAllUser(_: unknown, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.findAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserModel.findByPk(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, username, email, password, phone } = req.body;
      let { role } = req.body;
      if (!role) {
        role = "customer"
      }
      const user = await UserModel.create({ name, username, email, password, phone, role });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { credential, password } = req.body;
      const user = await UserModel.findOne({where: {email: credential}}) || await UserModel.findOne({where: {username: credential}});
      if (!user) {
        return res.status(401).json({ message: "Invalid credential" });
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credential" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;
      const user = await UserModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isValidPassword = bcrypt.compareSync(oldPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credential" });
      }
      await user.update({ password: newPassword });
      return res.status(200).json({ message: "Password updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.destroy();
      return res.status(200).json({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  }
}
