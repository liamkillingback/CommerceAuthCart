import React, { useState, Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navigation } from "../constants";
import { ShoppingCartItem } from "./index";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../state";
import { logo, aud } from "../assets";
import { Dialog, Transition } from "@headlessui/react";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = useSelector((state) => state.cart);
  useEffect(() => {
    setTotalPrice(0);
    cartItems.forEach((item) => {
      setTotalPrice(
        (totalPrice) => (totalPrice + (parseInt(item.price.slice(1))) * item.quantity)
      );
    });
  }, [cartItems]);

  return (
    <>
      <ShoppingBagIcon
        onClick={() => setOpen(true)}
        className="w-12 mx-5 cursor-pointer"
      />

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartItems.map((product, index) => (
                                <ShoppingCartItem
                                  product={product}
                                  key={index}
                                />
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${totalPrice}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

const NavSidebar = () => {
  const [open, setOpen] = useState(true);
  const isAuthenticated = Boolean(useSelector((state) => state.token));

  return (
    <>
      <Bars3Icon
        onClick={() => setOpen(true)}
        className="w-16 float-right  flex cursor-pointer"
      />

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative lg:hidden font-semibold z-10"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 lg:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 lg:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-lg">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute  left-0 top-0 -ml-8 flex pr-2 pt-4 lg:-ml-10 lg:pr-4">
                        <button
                          type="button"
                          className="rounded-lg text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll text-2xl bg-white py-6 shadow-xl">
                      <div className="px-4 lg:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Navigation
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 lg:px-6 ">
                        <div className="flex flex-col">
                          {navigation.map((item) => (
                            <div key={item.title}>
                              <NavLink
                                onClick={() => setOpen(false)}
                                className="w-full  px-2 hover:bg-[#ebe7e7] rounded-xl transition-all"
                              >
                                {item.title}
                              </NavLink>
                              <hr className="mb-5" />
                            </div>
                          ))}
                          <div className="w-full transition-all rounded-xl hover:bg-[#ebe7e7]">
                            {isAuthenticated ? (
                              <button
                                onClick={() => {
                                  dispatch(setLogout());
                                  setOpen(!open);
                                }}
                                className=" px-2 rounded-xl flex"
                              >
                                Logout
                              </button>
                            ) : (
                              <NavLink
                                onClick={() => setOpen(!open)}
                                className=" px-2 rounded-xl flex "
                                to="/login"
                              >
                                Login
                              </NavLink>
                            )}
                            <hr />
                          </div>
                          <div className="flex flex-row mt-10 items-center text-xl font-semibold">
                            <img className="w-10 mx-5" src={aud} alt="" />
                            <p>AUD</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

const Navbar = () => {
  const isAuthenticated = Boolean(useSelector((state) => state.token));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [inputBar, setInputBar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`/products/${e.target[0].value}`);
  };

  return (
    <>
      <div className="h-[5rem] w-full flex text-xl font-semibold">
        <NavLink className="h-full w-96 items-center flex" to="/">
          <img className="w-full p-5" src={logo} alt="" />
        </NavLink>
        {/* Regular */}
        <div className="hidden lg:flex justify-end w-full mr-8 flex-row items-center">
          {navigation.map((item) => (
            <NavLink
              className="px-2 transition-all mx-2 hover:bg-[rgba(0,0,0,0.2)] rounded-2xl"
              key={item.title}
              to={item.href}
            >
              {item.title}
            </NavLink>
          ))}

          <form onSubmit={handleSubmit} className="flex flex-row">
            <input
              type="text"
              placeholder="Search..."
              className="pl-2 bg-[#e6e1e1] rounded-xl"
            />
            <button type="submit">
              <MagnifyingGlassIcon className="w-8 cursor-pointer" />
            </button>
          </form>
          <ShoppingCart />

          <img className="w-10 mx-5" src={aud} alt="" />
          <p>AUD</p>
          {isAuthenticated ? (
            <button
              onClick={() => dispatch(setLogout())}
              className=" p-2 hover:bg-[rgba(0,0,0,0.1)] transition-all rounded-xl flex"
            >
              Logout
            </button>
          ) : (
            <NavLink
              className="p-2 hover:bg-[rgba(0,0,0,0.1)] transition-all rounded-xl ml-5  flex "
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
        {/* Mobile */}
        <div className="lg:hidden w-full flex justify-end px-5">
          <div className="flex">
            <ShoppingCart />
            <NavSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
