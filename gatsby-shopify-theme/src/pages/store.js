import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ProductList from '../components/ProductList';
import Header from '../components/header';
import LandingPage from '../components/LandingPage';

export default function Store({ data }) {
  const products = data && data.products.nodes;
  const landingPage = data && data.landingPage;
  return (
    <Layout>
      <Header />
      <LandingPage {...landingPage} />
      <div className="m-0">
        <ProductList products={products} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query StoreQuery {
    landingPage: sanityLandingPage(page: { eq: "store" }) {
      id
      _rawBody
      title
      subtitle
      contentLocation
      textColor
      cta {
        link
        text
      }
      mainImage {
        asset {
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
        alt
      }
    }
    products: allShopifyProduct(sort: { order: DESC, fields: handle }) {
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
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
