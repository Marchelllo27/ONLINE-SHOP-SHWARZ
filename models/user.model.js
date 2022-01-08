import bcrypt from "bcryptjs";

import db from "../data/database";

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async userExistAlready() {
    const userExist = await this.getUserWithSameEmail();
    if (userExist) return true;
    if (!userExist) return false;
  }

  comparePassword(hachedPassword) {
    return bcrypt.compare(this.password, hachedPassword);
  }

  async signup() {
    const hachedPass = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hachedPass,
      name: this.fullname,
      address: this.address,
    });
  }
}

export default User;
