import React, { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { setCart, emptyCart, removeCartItem } from "../state";

const Product = ({ product, index }) => {
  const [open, setOpen] = useState(false);
  const [showAdded, setShowAdded] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleCart = () => {
    let newProduct = { ...product, quantity: quantity };
    
    const filteredCart = cart.filter(function (item) {
      return item.title != product.title;
    });
    dispatch(removeCartItem(filteredCart));
    dispatch(setCart({ newProduct }));
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment} onClose={setOpen}>
        <Dialog as="div" className="relative z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="object-cover cursor-pointer object-center"
                        />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                          {product.title}
                        </h2>

                        <section
                          aria-labelledby="information-heading"
                          className="mt-2"
                        >
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-2xl text-gray-900">
                            {product.price}
                          </p>
                        </section>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-10 flex flex-row mb-5"
                        >
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>
                          <button
                            onClick={() =>
                              setQuantity((quantity) =>
                                quantity > 1
                                  ? quantity - 1
                                  : (quantity = quantity)
                              )
                            }
                            className="bg-gray-200 rounded-full w-6 m-2 flex justify-center text-3xl font-bold"
                          >
                            -
                          </button>
                          <label
                            htmlFor=""
                            className="m-2 flex items-center text-3xl font-bold"
                          >
                            {quantity}
                          </label>
                          <button
                            onClick={() =>
                              setQuantity((quantity) => quantity + 1)
                            }
                            className="bg-gray-200 rounded-full w-6 m-2 flex justify-center text-3xl font-bold"
                          >
                            +
                          </button>
                        </section>
                        <button
                          onClick={() => {handleCart(); setShowAdded(true)}}
                          className="bg-blue-700 h-10 p-2 rounded-2xl text-white hover:bg-black transition-all"
                        >
                          Add to Cart
                        </button>
                        <label htmlFor="" onClick={() => setShowAdded(true)} className={`ml-5 text-green-700 ${showAdded ? "" : "hidden"}`}>Added To Cart!</label>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="group relative">
        <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            onClick={() => setOpen(!open)}
            src={product.imageUrl}
            alt="404"
            className="h-full w-full object-cover cursor-pointer object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
    </>
  );
};

export default Product;
