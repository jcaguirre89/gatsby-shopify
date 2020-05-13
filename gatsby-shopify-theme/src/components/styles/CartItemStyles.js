import styled from 'styled-components';

const CartItemStyles = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 70px 1fr 40px;
  grid-gap: 5px;
  grid-template-rows: minmax(0, 1fr);
  h2,
  h3 {
    font-family: ${props => props.theme.fonts.body};
    margin: 0;
    font-size: 1.2rem;
    padding: 0 5px;
  }

  h2 {
    text-transform: uppercase;
    font-weight: ${props => props.theme.fontWeights.bold};
  }

  h3 {
    color: ${props => props.theme.colors.greys.medium};
  }
  .middle-col {
    height: 80px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 15px 15px 1fr;
  }
  .last-col {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .price {
    padding: 0 5px;
    margin-bottom: 0;
    margin-right: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  .remove-button {
    align-self: end;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0 5px;
    background: transparent;
    border: 0;
    text-transform: uppercase;
    font-size: 0.9rem;
    color: ${props => props.theme.colors.accent.medium};
    letter-spacing: 1px;
    cursor: pointer;
  }
`;

export default CartItemStyles;
