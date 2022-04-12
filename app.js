import express from "express";
import path from "path";
import csrf from "csurf";
import dotenv from "dotenv";
import mongoose from "mongoose";
import expressSession from "express-session";

import createSessionConfig from "./config/session";
// import db from "./data/database";
//import middlewares
import csrfTokenMiddleware from "./middlewares/csrf-token";
import errorsHandler from "./middlewares/error-handler";
import checkAuthMiddleware from "./middlewares/check-auth";
import protectAdminRoutes from "./middlewares/protect-routes";
import cartMiddleware from "./middlewares/cart";
import updateCartPricesMiddleware from "./middlewares/update-cart-prices";
//import routes
import baseRoutes from "./routes/base.routes";
import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";
import adminRoutes from "./routes/admin.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/orders.routes";

dotenv.config();

// Connection to MongoDB database

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB est connecté");
  })
  .catch(err => {
    console.log(err);
  });

const app = express();
const sessionConfig = createSessionConfig();

//EJS template engine
const __dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// SERVE STATIC FILES
app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);
app.use(csrfTokenMiddleware);
app.use(checkAuthMiddleware);

//ROUTES
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes);
app.use(protectAdminRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoutes);

//Error middleware
app.use(errorsHandler.errorsMiddleware);
app.use(errorsHandler.serverErrorsMiddleware);

// Start NodeJs server only if connecting to the database is established.
// db.connectToDatabase()
//   .then(() => {
//     const port = process.env.PORT || 3000;
//     app.listen(port, () =>
//       console.log(`The server is running on http://localhost:${port}`)
//     );
//   })
//   .catch(err => {
//     console.log("Failed to connect to the database!");
//     console.log(err);
//   });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
