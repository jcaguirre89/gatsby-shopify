import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { classnames } from 'tailwindcss-classnames';

// const ProductGrid = styled.div`
//   margin-top: 15px;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   grid-gap: 10px;
//   min-height: 500px;

//   @media (max-width: ${props => props.theme.breakpoints.m}) {
//     margin: 20px;
//     grid-gap: 100px;
//   }
// `;

export default function ProductList({ products }) {
  return (
    <div className="min-h-160 flex flex-wrap -mb-4 bg-gray-200">
      {products.map(product => (
        <ProductCard key={product.handle} product={product} />
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};
