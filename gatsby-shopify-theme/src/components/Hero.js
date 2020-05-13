import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export default function Hero({ title, subtitle, mainImage, cta }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative mt-20 lg:mt-64 mx-auto px-16">
        <h1 className="text-2xl md:text:4xl">{title}</h1>
        <h2>{subtitle}</h2>
        <div>
          {cta.length > 0 &&
            cta.map(item => (
              <Link
                className="mt-2 inline-block py-3 px-5 rounded-lg shadow-lg text-md uppercase tracking-wider font-bold bg-gray-100 text-gray-900"
                to={item.link}
                key={item.link}
              >
                {item.text}
              </Link>
            ))}
        </div>
      </div>
      <div className="relative md:absolute w-full z-0">
        <Img style={{ height: '100%' }} fluid={mainImage.asset.fluid} />
      </div>
    </div>
  );
}

Hero.propTypes = {
  cta: PropTypes.array,
  mainImage: PropTypes.shape({
    asset: PropTypes.shape({
      fluid: PropTypes.object.isRequired,
    }),
  }),
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
