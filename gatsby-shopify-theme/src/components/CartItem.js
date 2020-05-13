import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { FiTrash2 } from 'react-icons/fi';
import formatMoney from '../lib/formatMoney';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';

import UpdateQuantityButton from './UpdateCartButton';

const getQuantityInCart = (id, cartItems) => {
  // gets quantity of given variantId in cart or 0
  const item = cartItems.filter(i => i.variantId === id);
  if (item.length === 0) return 0;
  return item[0].quantity;
};

export default function CartItem({ variantId }) {
  const dispatch = useContext(GlobalDispatchContext);
  const { cartItems } = useContext(GlobalStateContext);
  const data = useStaticQuery(graphql`
    query CartItem {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            storePath
          }
        }
      }
      products: allShopifyProduct {
        nodes {
          title
          handle
          variants {
            id
          }
        }
      }
      variants: allShopifyProductVariant {
        nodes {
          id
          price
          title
          image {
            localFile {
              childImageSharp {
                fixed(width: 80, height: 80) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  `);

  const getTitle = id => {
    // Get product title for given variantId
    const [product] = data.products.nodes.filter(p => {
      const productVariant = p.variants && p.variants.filter(v => v.id === id);
      if (productVariant.length > 0) return p.title;
      return null;
    });
    return product.title;
  };
  const title = getTitle(variantId);

  const getHandle = id => {
    // Get product handle for given variantId
    const [product] = data.products.nodes.filter(p => {
      const productVariant = p.variants && p.variants.filter(v => v.id === id);
      if (productVariant.length > 0) return p.handle;
      return null;
    });
    return product.handle;
  };
  const handle = getHandle(variantId);

  const quantityInCart = getQuantityInCart(variantId, cartItems);
  const [variant] = data.variants.nodes.filter(v => v.id === variantId);
  const variantTitle = variant.title !== 'Default Title' ? variant.title : null;
  const { storePath } = data.site.siteMetadata.gatsbyStorefrontConfig;
  return (
    <div className="flex w-full px-4 mt-2">
      <div className="flex w-full justify-between bg-white border rounded-lg shadow-md h-20 overflow-hidden">
        <div className="h-full w-24">
          <Img
            fixed={variant.image.localFile.childImageSharp.fixed}
            alt={title}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
        <div className="flex flex-col justify-between ml-2 pb-1">
          <Link
            to={`${storePath}/${handle}/`}
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          >
            <h2 className="text-xl font-bold">{title}</h2>
          </Link>
          <h3 className="text-sm uppercase tracking-wide text-gray-600 font-bold -mt-4">
            {variantTitle}
          </h3>
          <p className="">{formatMoney(variant.price)}</p>
        </div>
        <div className="flex items-center justify-content ml-5">
          <UpdateQuantityButton
            variantId={variantId}
            quantity={quantityInCart}
          />
        </div>
        <button
          className="p-2 h-10 transform focus:scale-125 focus:outline-none"
          type="button"
          onClick={() =>
            dispatch({ type: 'REMOVE_FROM_CART', payload: { variantId } })
          }
        >
          <svg
            fill="none"
            className="stroke-current text-gray-800 w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  variantId: PropTypes.string.isRequired,
};
