import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from 'pg-protocol';
import httpException from '../exception/httpException';

export const handleErrors = (
  err: httpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({
    message,
    status,
  });
};

export const handleDatabaseErrors = (
  err: DatabaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.severity) {
    return res.status(409).json({
      message: err.detail,
    });
  }
  next(err);
};
