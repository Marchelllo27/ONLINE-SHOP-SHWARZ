import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schemaOptions = {
  versionKey: false,
};

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: {
        street: String,
        postalCode: String,
        city: String,
      },
      required: true,
    },
    isAdmin: Boolean,
  },
  schemaOptions
);

export default mongoose.model("users", usersSchema);
