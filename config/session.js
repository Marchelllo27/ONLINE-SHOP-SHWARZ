import expressSession from "express-session";
import mongoDbStore from "connect-mongodb-session";

const createSessionStore = () => {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: "mongodb+srv://marchelllo:marchelllo27@cluster0.w3yei.mongodb.net/carsale?retryWrites=true&w=majority",
    databaseName: "carsale",
    collection: "sessions",
  });

  return store;
};

const createSessionConfig = () => {
  return {
    secret: "super-super-secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
};

export default createSessionConfig;

// "mongodb://localhost:27017"
