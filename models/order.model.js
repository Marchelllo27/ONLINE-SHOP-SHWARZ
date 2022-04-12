import mongodb from "mongodb";
import orderCollection from "../data/orders.schema.js";

class Order {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    this.formattedDate = this.date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    this.id = orderId;
  }

  // FIND BY ID
  static async findById(orderId) {
    const order = await orderCollection.findById(orderId);
    return this.transformOrderDocument(order);
  }

  // FIND ALL
  static async findAll() {
    const orders = await orderCollection.find();
    return this.transformOrderDocuments(orders);
  }

  // FIND ALL ORDERS FOR SINGLE USER
  static async findAllForUser(userId) {
    const orders = await orderCollection.find({ "userData._id": userId });
    return this.transformOrderDocuments(orders);
  }

  // HELPER FUNCTIONS
  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformOrderDocument);
  }

  static transformOrderDocument(orderDoc) {
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  // UPDATE ORDER OR ADD ORDER
  save() {
    if (this.id) {
      //UPDATE ORDER
      return orderCollection.findByIdAndUpdate(this.id, {
        status: this.status,
      });
    } else {
      // ADD ORDER
      const orderDocument = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(),
        status: this.status,
      };

      return orderCollection.create(orderDocument);
    }
  }
}

export default Order;
