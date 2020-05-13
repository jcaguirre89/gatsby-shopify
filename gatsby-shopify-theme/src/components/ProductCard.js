import PropTypes from 'prop-types';
import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import formatMoney from '../lib/formatMoney';
import ChipOutOfStock from './styles/ChipOutOfStock';

export default function ProductCard({ product }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            storePath
          }
        }
      }
    }
  `);
  const {
    title,
    handle,
    variants: [firstVariant],
    images: [firstImage],
    tags,
    availableForSale,
  } = product;
  const { id: variantId, price } = firstVariant;
  const { storePath } = data.site.siteMetadata.gatsbyStorefrontConfig;

  return (
    <div className="w-full md:w-80 mx-4 mt-2 mb-4 antialiased text-gray-900">
      <Link to={`${storePath}/${handle}`}>
        <Img
          className="rounded-md shadow-md md:h-56"
          fluid={firstImage.localFile.childImageSharp.fluid}
        />
        <div className="relative -mt-12 px-6">
          <div className="bg-white p-4 rounded-md shadow-lg h-24">
            <div className="self-end">
              <p className="text-gray-600 text-xs uppercase tracking-wide font-semibold -mb-2">
                {tags ? (
                  tags.map((tag, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && (
                        <span className="text-gray-900 mx-1">&bull;</span>
                      )}
                      {tag}
                    </React.Fragment>
                  ))
                ) : (
                  <span></span>
                )}
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold">{title}</h3>
                {!availableForSale && <ChipOutOfStock>agotado</ChipOutOfStock>}
              </div>
            </div>
            <p className="self-end">
              <span className="uppercase text-xs tracking-wide text-gray-600 mr-1">
                CLP
              </span>
              <span>{formatMoney(price)}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    variants: PropTypes.array.isRequired,
    availableForSale: PropTypes.bool.isRequired,
    tags: PropTypes.array,
  }),
};
