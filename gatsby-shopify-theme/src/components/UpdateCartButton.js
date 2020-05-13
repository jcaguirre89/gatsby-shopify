import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { classnames } from 'tailwindcss-classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

const StyledButton = styled.button`
  display: grid;
  place-items: center;
  height: 20px;
  width: 20px;
  background: transparent;
  color: ${props => props.theme.colors.greys.veryDark};
  border: 0;
  margin: 0;
  cursor: pointer;

  &:disabled {
    color: ${props => props.theme.colors.greys.light};
  }
`;

const Container = styled.div`
  width: 20px;
  height: 60px;
  margin-right: 5px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const QuantityContainer = styled.span`
  flex-grow: 2;
  margin-left: 10px;
  display: grid;
  place-items: center center;
  font-size: 0.9rem;
  font-weight: 700;
  height: 20px;
  border: 0px solid;
`;

export default function UpdateQuantityButton({ variantId, quantity }) {
  const dispatch = useContext(GlobalDispatchContext);
  const handleClick = (id, q) => {
    dispatch({ type: 'UPDATE_CART', payload: { variantId: id, quantity: q } });
  };

  const UpdateButton = classnames('h-4 w-4 stroke-current stroke-2');

  return (
    <div className="flex py-2">
      <button
        className="w-6 flex items-center justify-center transform focus:scale-125 focus:outline-none"
        type="button"
        disabled={quantity <= 1}
        onClick={() => handleClick(variantId, quantity - 1)}
      >
        <svg
          className={classnames(
            UpdateButton,
            quantity <= 1 ? 'text-gray-400' : 'text-gray-700 hover:text-black'
          )}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <p className="m-2">{quantity}</p>
      <button
        className="w-6 flex items-center justify-center transform focus:scale-125 focus:outline-none"
        type="button"
        onClick={() => handleClick(variantId, quantity + 1)}
      >
        <svg
          className={classnames(UpdateButton, 'text-gray-700 hover:text-black')}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="M5 15l7-7 7 7"></path>
        </svg>
      </button>
    </div>
  );
}

UpdateQuantityButton.propTypes = {
  variantId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
