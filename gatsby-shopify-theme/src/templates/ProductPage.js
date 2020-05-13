/* eslint-disable react/prop-types, react/no-danger */

import React, { useContext, useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import Layout from '../components/layout';
import Header from '../components/header';
import formatMoney from '../lib/formatMoney';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import BaseButton from '../components/styles/BaseButton';
import ProductList from '../components/ProductList';
import VariantPicker from '../components/VariantPicker';
import ChipOutOfStock from '../components/styles/ChipOutOfStock';
import ImgZoom from '../components/ImgZoom';

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 100px;
  width: 100%;
  margin: 0;
  margin-top: 100px;
  padding: 0 20px;

  h2 {
    text-transform: uppercase;
    font-size: 4rem;
    margin-bottom: 0;
    color: ${props => props.theme.colors.primary.veryDark};
  }

  h3 {
    text-transform: uppercase;
    font-family: ${props => props.theme.fonts.body};
    font-size: 2.5rem;
  }

  .price {
    color: ${props => props.theme.colors.greys.medium};
    font-size: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    grid-gap: 40px;
    padding: 0;
    margin-bottom: 100px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  button {
    max-width: 350px;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    align-items: center;
    padding: 0;
    p {
      padding: 0 10px;
    }
  }
`;

const RelatedContainer = styled.div`
  background: ${props => props.theme.colors.secondary.veryLight};
  padding: 50px 0 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  h2 {
    font-size: 3rem;
    margin-bottom: 50px;
    color: ${props => props.theme.colors.secondary.veryDark};
  }
`;

const StyledProductList = styled(ProductList)`
  width: 90%;
  margin: auto;
`;

export default function ProductPage({ data }) {
  const { title, description, descriptionHtml, variants } = data.shopifyProduct;

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const products = data.products.nodes;
  const dispatch = useContext(GlobalDispatchContext);
  const { isCartOpen } = useContext(GlobalStateContext);

  const handleClick = () => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { variantId: selectedVariant.id, quantity: 1 },
    });
    if (!isCartOpen) {
      dispatch({ type: 'TOGGLE_CART' });
    }
  };

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Header />
      <div className="bg-gray-200 transform translate-y-16 lg:translate-y-32">
        <div className="relative lg:flex lg:min-h-120 lg:w-full lg:justify-center">
          <div className="relative py-6 h-64 sm:h-full lg:w-1/2 lg:px-4 lg:sticky lg:top-0">
            <Img
              style={{ height: '100%' }}
              className="lg:border lg:rounded-lg h-full overflow-hidden"
              fluid={selectedVariant.image.localFile.childImageSharp.fluid}
            />
          </div>
          <div className="px-4 pb-10 lg:py-10 lg:w-1/3">
            <div className=" relative p-4 bg-white border rounded-lg shadow-md -mt-10 lg:mt-0 lg:h-full lg:-ml-16">
              <div className="flex justify-between items-baseline">
                <h2 className="text-4xl xl:text-6xl font-bold">{title}</h2>
                <p className="text-lg lg:text-2xl">
                  {formatMoney(selectedVariant.price)}
                </p>
              </div>
              <div className="flex items-baseline">
                {!selectedVariant.availableForSale && (
                  <ChipOutOfStock>agotado</ChipOutOfStock>
                )}
                {variants.length > 1 && (
                  <p className="uppercase lg:text-lg tracking-wide text-gray-600">
                    {selectedVariant.title}
                  </p>
                )}
              </div>
              {variants.length > 1 && (
                <div className="mt-4">
                  <h3 className="text-xl lg:text-2xl">Elige tu diseño</h3>
                  <VariantPicker
                    className="mt-2"
                    variants={variants}
                    selectedVariantId={selectedVariant.id}
                    setSelectedVariant={setSelectedVariant}
                  />
                </div>
              )}
              <p
                className="mt-4 lg:text-lg"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              ></p>
              <button
                className={`focus:shadow-outline focus:outline-none mt-4 px-3 py-2 font-bold bg-indigo-700  hover:bg-indigo-500 text-indigo-100 rounded-lg shadow-lg ${!selectedVariant.availableForSale &&
                  'opacity-50 cursor-not-allowed'}`}
                disabled={!selectedVariant.availableForSale}
                type="button"
                onClick={() => handleClick()}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        {products && (
          <div className="px-4">
            <h2 className="text-2xl font-bold mb-4">
              También te podría interesar
            </h2>
            <ProductList products={products} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($handle: String!) {
    products: allShopifyProduct(
      limit: 5
      sort: { order: DESC, fields: handle }
      filter: { handle: { ne: $handle }, availableForSale: { eq: true } }
    ) {
      nodes {
        title
        description
        handle
        availableForSale
        tags
        variants {
          id
          price
        }
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      description
      descriptionHtml
      variants {
        id
        price
        title
        availableForSale
        image {
          localFile {
            childImageSharp {
              fixed(width: 80, height: 80) {
                ...GatsbyImageSharpFixed_withWebp
              }
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
