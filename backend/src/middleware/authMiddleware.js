import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
    if (!token) throw new AppError('Authentication required', 401);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) { next(error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' ? new AppError('Invalid or expired token', 401) : error); }
};
export const adminOnly = (req, res, next) => req.user?.role === 'admin' ? next() : next(new AppError('Admin access required', 403));
