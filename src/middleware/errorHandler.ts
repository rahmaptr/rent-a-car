import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) {
  console.log(err);
  if (err instanceof Error && "name" in err) {
    switch (err.name) {
      case "SequlizeValidationError":
      case "SequelizeUniqueConstraintError":
        return res.status(400).json({ message: err.message });

      default:
        break;
    }
  } else {
    if (err instanceof Object && "message" in err) {
      const errMsg = err.message as string;
      switch (errMsg) {
        case "Invalid credential":
          return res.status(401).json({ message: errMsg });
  
        case "Unauthorized":
          return res.status(403).json({ message: errMsg });
  
        case "Not Found":
          return res.status(404).json({ message: errMsg });
  
        case "Car hasn't been returned":
          return res.status(400).json({ message: errMsg })
  
        case "Car is rented":
          return res.status(400).json({ message: errMsg })
  
        default:
          break;
      }
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
