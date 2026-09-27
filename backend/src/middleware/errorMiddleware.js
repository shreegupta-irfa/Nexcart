export const notFound = (req, res) => res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` });
export const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(err.statusCode || 500).json({ success: false, message: err.statusCode ? err.message : 'Something went wrong' });
};
