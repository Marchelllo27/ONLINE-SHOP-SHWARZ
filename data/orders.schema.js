import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schemaOptions = {
  versionKey: false,
};

const ordersSchema = new Schema(
  {
    userData: {
      type: {
        email: String,
        name: String,
        address: Object,
      },
    },
    productData: {
      type: {
        items: [
          {
            product: {
              title: String,
              summary: String,
              price: Number,
              description: String,
              image: String,
              imagePath: String,
              imageUrl: String,
              id: String,
            },
            quantity: Number,
            totalPrice: Number
          },
        ],

        totalQuantity: Number,
        totalPrice: Number,
      },
    },
    date: Date,
    status: String,
  },
  schemaOptions
);

export default mongoose.model("orders", ordersSchema);
