const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${status} - ${message}`);

  return res.status(status).json({
    status,
    message,
  });
};

export default errorHandler;