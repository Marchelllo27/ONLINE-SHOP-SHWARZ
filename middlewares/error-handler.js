const serverErrorsMiddleware = (error, req, res, next) => {
  console.log(error);

  if (error.code === 404) {
    res.render('shared/404')
  }
  res.status(500).render("shared/500");
};

const errorsMiddleware = (req, res) => {
  res.status(404).render("shared/404");
};

export default {
  serverErrorsMiddleware,
  errorsMiddleware,
};
