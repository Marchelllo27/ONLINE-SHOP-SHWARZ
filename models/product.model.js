// import db from "../data/database";
import productsCollection from "../data/products.schema";
import mongodb from "mongodb";

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findById(productId) {
    const product = await productsCollection.findById(productId);

    if (!product) {
      const error = new Error("Could not find product with provided id");
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }

  static async findAll() {
    const products = await productsCollection.find({});

    return products.map(productDocument => {
      return new Product(productDocument);
    });
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await productsCollection.find({
      _id: { $in: productIds },
    });

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }

      await productsCollection.updateOne(
        { _id: productId },
        { $set: productData }
      );
    } else {
      await productsCollection.create(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  async remove() {
    // const productId = new mongodb.ObjectId(this.id);
    // await db.getDb().collection("products").deleteOne({ _id: productId });
    await productsCollection.findByIdAndDelete(this.id)
  }
}

export default Product;
