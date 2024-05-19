import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";

export async function authentication(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.headers.authorization;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [type, token] = user.split(" ");
    if (type !== "Bearer") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload: JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const data = await User.findByPk(payload.id);
    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = data;
    next();
  } catch (error) {
    next(error);
  }
}
