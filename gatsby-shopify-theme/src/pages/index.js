import React from 'react';
import { graphql } from 'gatsby';
import LandingPage from '../components/LandingPage';
import Layout from '../components/layout';

export default function Home({ data }) {
  const landingPage = data && data.landingPage;
  return (
    <Layout>
      <LandingPage {...landingPage} />
    </Layout>
  );
}

export const query = graphql`
  query HomeLandingQuery {
    landingPage: sanityLandingPage(page: { eq: "home" }) {
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
  }
`;
