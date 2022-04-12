import bcrypt from "bcryptjs";
import mongodb from "mongodb";
import usersCollection from "../data/users.schema.js";
// import db from "../data/database";

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

  static findById(userId) {
    // const uid = new mongodb.ObjectId(userId);

    return usersCollection.findById(userId).select({ password: 0 });
  }

  getUserWithSameEmail() {
    return usersCollection.findOne({ email: this.email });
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

    await usersCollection.create({
      email: this.email,
      password: hachedPass,
      name: this.fullname,
      address: this.address,
    });
  }
}

export default User;
