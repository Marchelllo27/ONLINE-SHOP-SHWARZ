const isEmpty = value => {
  return !value && value.trim() === "";
};

const userCredentialsAreValid = (email, password) => {
  return email && email.includes("@") && password.trim().length >= 6;
};

const userInputsAreValid = (
  email,
  password,
  fullname,
  street,
  postal,
  city
) => {
  return (
    userCredentialsAreValid(email, password),
    !isEmpty(fullname) && !isEmpty(street) && !isEmpty(postal) && !isEmpty(city)
  );
};

const isEmailConfirmed = (email, confirmedEmail) => {
  return email === confirmedEmail;
};

export default {
  userInputsAreValid,
  isEmailConfirmed,
};
