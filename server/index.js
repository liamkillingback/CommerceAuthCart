import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js"
import Product from "./models/Product.js";

//Configurations
const app = express();
const jsonParser = bodyParser.json();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb" }));
app.use(cors());
app.use(express.json());

//Routes
app.use("/auth", jsonParser, authRoutes);
app.use("/products", jsonParser, productRoutes );

const PORT = 8080 || process.env.PORT;

// const newProduct = new Product({
//   title: "Metal pen holder",
//   imageUrl: "https://m.media-amazon.com/images/I/71XPUZF7-+L.jpg",
//   price: "$20",
//   color: "Silver"
// })
// newProduct.save()

//DB Connection + app
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(`${error}, did not connect`));
