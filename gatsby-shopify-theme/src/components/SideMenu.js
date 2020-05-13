import React, { useContext, useEffect, useCallback } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { classnames } from 'tailwindcss-classnames';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';
import SocialLinks from './SocialLinks';

export default function Menu() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          email
          phone
          instagramHandle
          facebookHandle
          twitterHandle
          gatsbyStorefrontConfig {
            storePath
            collectionsPath
          }
        }
      }
    }
  `);
  const {
    email,
    phone,
    gatsbyStorefrontConfig: { storePath, collectionsPath },
  } = data.site.siteMetadata;
  const { isMenuOpen } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  const escFunction = useCallback(
    event => {
      if (isMenuOpen && event.keyCode === 27) {
        dispatch({ type: 'TOGGLE_MENU' });
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    // CLose on esc press
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const MenuStyles = classnames(
    'z-20 fixed top-0 left-0 h-screen w-screen sm:w-100 bg-gray-200 shadow-lg transform transition ease-in duration-300',
    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
  );

  return (
    <div className={MenuStyles}>
      <button
        className="close-button"
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
      >
        <svg
          fill="none"
          className="h-6 w-6 stroke-current text-gray-800"
          viewBox="0 0 24 24"
        >
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
      </button>
      <ul>
        <Link
          onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
          to={`${storePath}`}
        >
          Store
        </Link>
        <Link
          onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
          to={`${collectionsPath}`}
        >
          Collections
        </Link>
        <Link onClick={() => dispatch({ type: 'TOGGLE_MENU' })} to={`/about`}>
          About
        </Link>
      </ul>
      <div>
        <h3>Have Questions?</h3>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
      <SocialLinks />
    </div>
  );
}
