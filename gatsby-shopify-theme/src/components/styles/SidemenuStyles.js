import styled from 'styled-components';

const MenuStyles = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  bottom: 0;
  z-index: 5;
  min-width: 300px;
  max-width: 400px;
  width: 40%;
  height: 100%;
  padding: 20px;
  background: ${props => props.theme.colors.greys.white};
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  ${props => props.open && `transform: translateX(0);`};
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    min-width: auto;
    width: 100%;
  }
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 170px;
    width: 100%;
    list-style: none;
  }

  a {
    font-size: 2.5rem;
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary.medium};
    margin-right: 10px;
  }

  .close-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export default MenuStyles;
