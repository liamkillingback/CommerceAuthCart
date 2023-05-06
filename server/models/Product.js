import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 25
  },
  description: {
    type: String,
    required: false,
    max: 500,
  },
  imageUrl: {
    type: String,
    required: true,
    max: 500,
  },
  catagory: {
    type: String,
    required: false,
    max: 25
  },
  price: {
    type: String,
    required: true,
    max: 5
  },
  color: {
    type: String,
    required: false,
    max: 15
  }
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
