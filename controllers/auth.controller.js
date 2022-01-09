import User from "../models/user.model";
import authUtil from "../util/authentication";
import validation from "../util/validationUserInput";
import sessionUtil from "../util/session-flash";

//  SIGN UP
const getSignUp = (req, res) => {
  let sessionData = sessionUtil.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmedEmail: "",
      password: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }
  res.render("customer/auth/signup", { inputData: sessionData });
};

const postSignUp = async (req, res, next) => {
  const {
    email,
    password,
    "confirm-email": confirmedEmail,
    fullname,
    street,
    postal,
    city,
  } = req.body;

  const userInputs = {
    email: email,
    confirmedEmail: confirmedEmail,
    password: password,
    fullname: fullname,
    street: street,
    postal: postal,
    city: city,
  };

  if (
    !validation.userInputsAreValid(
      email,
      password,
      fullname,
      street,
      postal,
      city
    ) ||
    !validation.isEmailConfirmed(email, confirmedEmail)
  ) {
    //if user inputs aren't valid we save userInputs and error message to session.
    sessionUtil.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your input.Password must be at least 6 characters long, postal code must be 5 characters long",
        ...userInputs,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(email, password, fullname, street, postal, city);

  try {
    const userExist = await user.userExistAlready();
    if (userExist) {
      sessionUtil.flashDataToSession(
        req,
        {
          errorMessage: "User exist already!Try logging in instead!",
          ...userInputs,
        },
        () => {
          res.redirect("/signup");
        }
      );
      return;
    }

    await user.signup();
  } catch (error) {
    next(error);
  }

  res.redirect("/login");
};

//  LOGIN
const getLogin = (req, res) => {
  let sessionData = sessionUtil.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }

  res.render("customer/auth/login", { inputData: sessionData });
};

const postLogin = async (req, res) => {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
  }

  const sessionErrorData = {
    errorMessage:
      "Invalid credentials - please double-check your email and password!",
    email: user.email,
    password: user.password,
  };

  if (!existingUser) {
    sessionUtil.flashDataToSession(req, sessionErrorData, () => {
      res.redirect("/login");
    });
    return;
  }

  const validUserPassword = await user.comparePassword(existingUser.password);
  if (!validUserPassword) {
    sessionUtil.flashDataToSession(req, sessionErrorData, () => {
      res.redirect("/login");
    });
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

// LOG OUT
const logOut = (req, res) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
};

export default {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
  logOut,
};
