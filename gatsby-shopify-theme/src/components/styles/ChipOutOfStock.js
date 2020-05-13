import PropTypes from 'prop-types';
import React from 'react';

export default function ChipOutOfStock({ children }) {
  return (
    <span className="inline-block px-2 ml-1 bg-gray-300 text-gray-800 rounded-full text-xs uppercase tacking-wide">
      {children}
    </span>
  );
}

ChipOutOfStock.propTypes = {
  children: PropTypes.string,
};

ChipOutOfStock.defaultProps = {
  children: 'agotado',
};
