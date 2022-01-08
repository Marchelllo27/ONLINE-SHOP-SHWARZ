import User from "../models/user.model";
import util from "../util/authentication";
import validation from "../util/validationUserInput";

//  SIGN UP
export const getSignup = (req, res) => {
  res.render("customer/auth/signup");
};

export const signUp = async (req, res, next) => {
  const {
    email,
    password,
    "confirm-email": confirmedEmail,
    fullname,
    street,
    postal,
    city,
  } = req.body;

  if (
    !validation.userInputsAreValid(
      email,
      password,
      fullname,
      street,
      postal,
      city
    ) ||
    !validation.isEmailConfirmer(email, confirmedEmail)
  ) {
    return res.redirect("/signup");
  }

  const user = new User(email, password, fullname, street, postal, city);

  try {
    const userExist = await user.userExistAlready();
    if (userExist) {
      return res.redirect("/signup");
    }

    await user.signup();
  } catch (error) {
    next(error);
  }

  res.redirect("/login");
};

//  LOGIN
export const getLogin = (req, res) => {
  res.render("customer/auth/login");
};

export const login = async (req, res) => {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
  }

  if (!existingUser) {
    res.redirect("/login");
    return;
  }

  const validUserPassword = await user.comparePassword(existingUser.password);
  if (!validUserPassword) {
    res.redirect("/login");
    return;
  }

  util.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

// LOG OUT
export const logout = (req, res) => {
  util.destroyUserAuthSession(req);
  res.redirect("/login");
};
