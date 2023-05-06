import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { emptyCart, removeCartItem } from '../state'

const ShoppingCartItem = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const handleRemove = () => {
    const filteredCart = cartItems.filter(function(item) { return item.title != product.title})
    dispatch(removeCartItem(filteredCart))
  }
  return (
    <>
      <li className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.imageUrl}
            alt="404"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href="#">{product.title}</a>
              </h3>
              <p className="ml-4">${(parseInt(product.price.slice(1))) * product.quantity}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">color</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Qty </p>
            <p className="font-bold text-xl">{product.quantity}</p>
            <div className="flex">
              <button
              onClick={handleRemove}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ShoppingCartItem;
