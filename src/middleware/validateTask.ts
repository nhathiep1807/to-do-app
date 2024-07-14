import { Request, Response, NextFunction } from "express";

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, startDate, endDate } = req.body;

  if (!name || typeof name !== "string" || name.length > 80) {
    return res.status(400).json({ error: "Invalid task name" });
  }

  if (endDate && !startDate) {
    return res
      .status(400)
      .json({ error: "Start date must be present if end date is provided" });
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (startDate && !dateRegex.test(startDate)) {
    return res
      .status(400)
      .json({ error: "Start date must be in YYYY-MM-DD format" });
  }

  if (endDate && !dateRegex.test(endDate)) {
    return res
      .status(400)
      .json({ error: "End date must be in YYYY-MM-DD format" });
  }

  next();
};
