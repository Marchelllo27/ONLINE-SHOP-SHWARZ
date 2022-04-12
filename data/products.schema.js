import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schemaOptions = {
  versionKey: false,
};

const productsSchema = new Schema(
  {
    title: {
      type: String,
    },
    summary: {
      type: String,
    },
    price: {
      type: Number,
    },

    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  schemaOptions
);

export default mongoose.model("products", productsSchema);
