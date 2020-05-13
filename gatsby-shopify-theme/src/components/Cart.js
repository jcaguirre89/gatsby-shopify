import React, { useState, useContext, useCallback, useEffect } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import Spinner from 'react-svg-spinner';
import { classnames } from 'tailwindcss-classnames';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';
import { ShopifyClientContext } from '../context/ShopifyClientProvider';
import CartItem from './CartItem';
import useCheckoutAmout from '../hooks/useCheckoutAmount';
import formatMoney from '../lib/formatMoney';
import BaseButton from './styles/BaseButton';
import theme from './styles/theme';

export default function Cart() {
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const { isCartOpen, cartItems } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const shopifyClient = useContext(ShopifyClientContext);
  const amount = useCheckoutAmout();
  // TODO: Set shipping amount
  const shippingAmount = 0;
  const totalAmount = amount + shippingAmount;

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    const checkout = await shopifyClient.checkout.create();
    const { id: checkoutId, webUrl } = checkout;
    if (cartItems.length === 0) return 'No items in cart';
    const lineItems = cartItems.map(item => ({
      variantId: item.variantId.replace('Shopify__ProductVariant__', ''),
      quantity: item.quantity,
    }));
    await shopifyClient.checkout.addLineItems(checkoutId, lineItems);
    window.location.href = webUrl;
  };

  const escFunction = useCallback(
    event => {
      if (isCartOpen && event.keyCode === 27) {
        dispatch({ type: 'TOGGLE_CART' });
      }
    },
    [isCartOpen]
  );

  useEffect(() => {
    // CLose on esc press
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const CartStyles = classnames(
    'z-20 fixed top-0 right-0 h-screen w-screen sm:w-100 bg-indigo-100 shadow-lg transform transition ease-in duration-300',
    isCartOpen ? 'translate-x-0' : 'translate-x-full'
  );

  return (
    <div className={CartStyles}>
      <div className="flex flex-col h-full">
        <header className="bg-indigo-600 h-2/12">
          <div className="p-2 flex flex-col justify-between h-full">
            <button
              className="w-6"
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            >
              <svg
                fill="none"
                className="h-6 w-6 stroke-current text-indigo-100"
                viewBox="0 0 24 24"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            <svg
              className="h-12 w-12 stroke-current text-indigo-100 rounded-full bg-indigo-500 p-2 shadow-md self-center"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </header>
        <ul className="overflow-y-scroll h-6/12 mt-2">
          {cartItems.length > 0 &&
            // TODO: sort
            cartItems
              .sort((a, b) => a.variantId > b.variantId)
              .map(item => (
                <CartItem key={item.variantId} variantId={item.variantId} />
              ))}
        </ul>
        <footer className="h-2/12 flex flex-col mt-2 px-2 border-t-2 border-gray-600 bg-indigo-100">
          <div className="flex justify-between items-baseline">
            <p className="">Sub-Total</p>
            <span>{formatMoney(amount)}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <p className="">Shipping</p>
            <span>{formatMoney(shippingAmount)}</span>
          </div>
          <div className="flex justify-between items-baseline mt-1">
            <p className="font-semibold text-xl">Total</p>
            <div>
              <span className="uppercase text-xs tracking-wide text-gray-600 mr-1">
                CLP
              </span>
              <span>{formatMoney(totalAmount)}</span>
            </div>
          </div>
        </footer>
        <div className="h-2/12 px-2 bg-indigo-100 flex items-center justify-center">
          {isCheckoutLoading ? (
            <Spinner size="32px" />
          ) : (
            <button
              type="button"
              className="px-3 py-2 border rounded-lg uppercase tracking-wide font-bold text-indigo-100 bg-indigo-600 hover:bg-indigo-700"
              disabled={isCheckoutLoading}
              onClick={() => handleCheckout()}
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
