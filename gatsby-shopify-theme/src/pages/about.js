import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import LandingPage from '../components/LandingPage';
import Layout from '../components/layout';
import Header from '../components/header';

export default function Home({ data }) {
  const landingPage = data && data.landingPage;
  return (
    <Layout>
      <Header smart />
      <LandingPage {...landingPage} />
    </Layout>
  );
}

export const query = graphql`
  query AboutLandingQuery {
    landingPage: sanityLandingPage(page: { eq: "about" }) {
      id
      _rawBody
      title
      subtitle
      textColor
      contentLocation
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
