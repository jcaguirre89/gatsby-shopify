import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { classnames } from 'tailwindcss-classnames';

const Grid = styled.div`
  display: grid;
  width: 100%;
  max-width: 350px;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-gap: 15px;

  button {
    background: white;
    height: 80px;
    padding: 0;
    margin: 0;
    border: 0;
    cursor: pointer;
    transition: all ease-in 0.25s;
  }

  button:disabled {
    cursor: not-allowed;
  }

  button:disabled::before {
    position: absolute;
    content: '';
    background: rgba(255, 255, 255, 0.5);
    width: 80px;
    height: 80px;
    pointer-events: none;
    z-index: 1;
  }

  .selected {
    transform: scale(1.1);
  }
`;

export default function VariantPicker({
  variants,
  selectedVariantId,
  setSelectedVariant,
  className,
}) {
  const pickVariant = variants.map(variant => (
    <button
      className={classnames(
        'focus:outline-none focus:border focus:px-4 focus:shadow-outline',
        variant.id === selectedVariantId && 'transform scale-110'
      )}
      type="button"
      onClick={() => setSelectedVariant(variant)}
      // disabled={!variant.availableForSale}
    >
      <Img
        style={{ width: '100%' }}
        key={variant.id}
        fixed={variant.image.localFile.childImageSharp.fixed}
      />
    </button>
  ));
  return <Grid className={className}>{pickVariant}</Grid>;
}

VariantPicker.propTypes = {
  selectedVariantId: PropTypes.string.isRequired,
  setSelectedVariant: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired,
};
