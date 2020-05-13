import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CollectionList from '../components/CollectionList';
import Header from '../components/header';
import LandingPage from '../components/LandingPage';

const Content = styled.div`
  margin: 0;
  background: ${props => props.theme.colors.greys.white};
`;

export default function Collections({ data }) {
  const collections = data && data.collections.nodes;
  const landingPage = data && data.landingPage;

  return (
    <Layout>
      <Header smart />
      <LandingPage {...landingPage} />
      <Content>
        <CollectionList collections={collections} />
      </Content>
    </Layout>
  );
}

export const query = graphql`
  query CollectionsQuery {
    landingPage: sanityLandingPage(page: { eq: "collections" }) {
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
    collections: allShopifyCollection {
      nodes {
        descriptionHtml
        handle
        title
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
