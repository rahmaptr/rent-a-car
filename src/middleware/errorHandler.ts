import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) {
  console.error(err);
  if (err instanceof Error) {
    switch (err.name) {
      case "SequlizeValidationError":
      case "SequelizeUniqueConstraintError":
        return res.status(400).json({ message: err.message });

      case "Invalid credential":
        return res.status(401).json({ message: err.message });

      case "Unauthorized":
        return res.status(403).json({ message: err.message });

      case "Not Found":
        return res.status(404).json({ message: err.message });

      default:
        break;
    }
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
