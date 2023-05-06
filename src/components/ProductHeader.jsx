import React, { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { CSpinner } from "@coreui/react";
import axios from "axios";
import { Product } from "./index.js";
const URL = "http://localhost:8080/products/all";

const ProductHeader = () => {
  const [products, setProducts] = useState([{}]);

  const getProducts = async () => {
    const response = await axios.post(URL, { limit: 4 });
    const dataBaseProducts = response?.data?.products;
    setProducts(dataBaseProducts);
  };

  
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-[#f1f1f1]">
      <div
        id="products"
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Popular items
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
              <Product product={product} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductHeader;
