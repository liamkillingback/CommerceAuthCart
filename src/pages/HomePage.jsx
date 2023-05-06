import React, { useEffect } from "react";
import { ProductHeader, Collections } from "../components";
import { motion } from "framer-motion";
import { pointer } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../state";

const HomePage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart)
  
  return (
    <>
      <div className="min-h-screen wallpaper flex flex-col items-center font-serif font-semibold tracking-[0.7rem] text-white w-full ">
      <hr className="w-4/5 mt-10" />
          <p className="text-5xl">Trending</p>
      <hr className="w-4/5 mt-1 mb-5" />

        <Collections />
        <div className="relative">
          <a href="#products">
            <div className="mt-10 h-32">
              <motion.div
                animate={{
                  y: [0, 100, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <img className="w-28 h-10" src={pointer} alt="" />
              </motion.div>
            </div>
          </a>
        </div>
      </div>
      <ProductHeader />
    </>
  );
};

export default HomePage;
