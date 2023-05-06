import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const filter = req.body;
  if (Boolean(filter.limit)) {
    const products = await Product.find().limit(filter.limit)
    return res.status(200).json({ products });
  }
};
