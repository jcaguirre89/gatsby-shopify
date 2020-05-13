import styled from 'styled-components';

const CartStyles = styled.div`
  position: fixed;
  top: 90px;
  right: 0;
  bottom: 0;
  z-index: 5;
  min-width: 300px;
  max-width: 400px;
  width: 40%;
  height: 85%;
  transition: all 0.3s;
  background: ${props => props.theme.colors.greys.white};
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  ${props => props.open && `transform: translateX(0);`};
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    min-width: auto;
    width: 100%;
  }

  .inner {
    display: grid;
    place-items: center;
    grid-template-rows: 20px 50px 1fr auto;
    padding: 20px 10px;

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 100%;
      max-height: 230px;
      width: 100%;
      padding: 2px;
      list-style: none;
      overflow-y: scroll;
    }

    .close-button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: none;
      border: none;
      cursor: pointer;
    }

    footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    header {
      text-transform: uppercase;
      font-size: 1.6rem;
    }
  }
`;

export default CartStyles;
