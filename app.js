import express from "express";
import path from "path";
import csrf from "csurf";
import expressSession from "express-session";

import createSessionConfig from "./config/session";
import db from "./data/database";
//import middlewares
import csrfTokenMiddleware from "./middlewares/csrf-token";
import errorsHandler from "./middlewares/error-handler";
import checkAuthMiddleware from "./middlewares/check-auth";
//import routes
import baseRoutes from "./routes/base.routes";
import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";

const app = express();

//EJS template engine
const __dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(csrfTokenMiddleware);
app.use(checkAuthMiddleware);

//ROUTES
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

//Error middleware
app.use(errorsHandler.errorsMiddleware);
app.use(errorsHandler.serverErrorsMiddleware);

// Start NodeJs server only if connecting to the database is done.
db.connectToDatabase()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`The server is running on http://localhost:${port}`)
    );
  })
  .catch(err => {
    console.log("Failed to connect to the database!");
    console.log(err);
  });