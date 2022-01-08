const serverErrorsMiddleware = (error, req, res, next) => {
  console.log(error);
  res.status(500).render("./shared/500");
};

const errorsMiddleware = (req, res) => {
  res.status(404).render("./shared/404");
};

export default {
  serverErrorsMiddleware,
  errorsMiddleware,
};
