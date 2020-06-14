export const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message || "Something went Wrong!",
      },
    });
  } else {
    next(err);
  }
};

export const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.json({ error: err });
};

export const logErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  next(err);
};
