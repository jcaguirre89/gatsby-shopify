import styled from 'styled-components';

const ProductCardStyles = styled.div`
  background: ${props => props.theme.colors.greys.white};
  border: 0;
  display: flex;
  flex-direction: column;
  margin: 0;
  min-width: 250px;
  max-width: 500px;
  max-height: 400px;

  .product-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    h3 {
      font-weight: ${props => props.theme.fontWeights.heading};
      color: ${props => props.theme.colors.accent.veryDark};
      margin: 10px auto;
      text-transform: uppercase;
    }
    p {
      font-size: 1.3rem;
    }
  }
`;

export default ProductCardStyles;
