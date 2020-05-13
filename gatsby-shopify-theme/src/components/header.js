import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { classnames } from 'tailwindcss-classnames';
import Logo from './Logo';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import useSmartHeader from '../hooks/useSmartHeader';
import Nav from './Nav';

export default function Header() {
  const dispatch = useContext(GlobalDispatchContext);
  const { isMenuOpen, cartItems } = useContext(GlobalStateContext);
  const [hideNavbarOnScroll, transparent] = useSmartHeader();

  const getCartSize = () => {
    if (cartItems.length === 0) return 0;
    const n = cartItems.reduce((agg, item) => agg + item.quantity, 0);
    return n;
  };

  const n = getCartSize();
  // Styles
  const HeaderBase = classnames(
    'fixed bg-white z-10 w-full justify-between transform transition ease-in-out duration-200 border-b border-yellow-300',
    { '-translate-y-full': !hideNavbarOnScroll }
  );

  const ButtonBase = classnames(
    'flex justify-center items-center stroke-current text-gray-900 focus:text-gray-700 focus:outline-none'
  );

  const IconsBase = classnames('h-8 w-8');

  return (
    <header className={HeaderBase}>
      <div className="p-2 flex justify-between">
        <button
          className={classnames(ButtonBase, 'md:hidden')}
          type="button"
          onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
        >
          <svg
            fill="none"
            className={classnames(IconsBase)}
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <Link to="/">
          <Logo width="50px" height="50px" color="black" />
        </Link>
        <ul className="block flex items-center justify-between lg:self-end px-2">
          <button
            type="button"
            className={classnames(ButtonBase)}
            onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
          >
            <svg
              fill="none"
              className={classnames(IconsBase)}
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <div className="relative">
            {n > 0 && (
              <div className="absolute top-0 right-0 bg-indigo-500 rounded-full px-2 transform -translate-y-2 translate-x-2">
                {n}
              </div>
            )}
            <button
              className={classnames(ButtonBase)}
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            >
              <svg
                fill="none"
                className={classnames(IconsBase)}
                viewBox="0 0 24 24"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </button>
          </div>
        </ul>
      </div>
      <Nav
        className={classnames(
          isMenuOpen ? 'flex' : 'hidden',
          'md:flex flex-col px-2 pt-2 pb-4 md:flex-row md:p-0 text-2xl md:text-2xl'
        )}
      />
    </header>
  );
}
