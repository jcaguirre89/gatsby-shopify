import PropTypes from 'prop-types';
import React from 'react';
import Hero from './Hero';
import BlockContent from './BlockContent';
import Header from './header';

export default function LandingPage(props) {
  const { _rawBody, textColor, contentLocation } = props;
  const color = textColor || '#fff';
  const location = contentLocation || 'left';
  return (
    <div>
      <Header />
      <Hero {...props} />
      <div>{_rawBody && <BlockContent blocks={_rawBody} />}</div>
    </div>
  );
}

LandingPage.propTypes = {
  _rawBody: PropTypes.any,
  cta: PropTypes.array,
  mainImage: PropTypes.any,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  textColor: PropTypes.objectOf(PropTypes.string),
  contentLocation: PropTypes.string,
};
