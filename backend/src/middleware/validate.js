import AppError from '../utils/AppError.js';
export const requireFields = (...fields) => (req, res, next) => {
  const missing = fields.filter((field) => !req.body?.[field]);
  if (missing.length) return next(new AppError(`Missing required fields: ${missing.join(', ')}`, 422));
  next();
};
export const validateEmail = (req, res, next) => /\S+@\S+\.\S+/.test(req.body?.email || '') ? next() : next(new AppError('A valid email is required', 422));
