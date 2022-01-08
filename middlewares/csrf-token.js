const csrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

export default csrfToken;
