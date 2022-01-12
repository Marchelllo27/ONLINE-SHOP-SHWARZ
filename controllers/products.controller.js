import Product from "../models/product.model";

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("customer/products/all-products", { products: products });
  } catch (error) {
    return next(error);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("customer/products/product-details", { product: product });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllProduct,
  getProductDetails,
};
