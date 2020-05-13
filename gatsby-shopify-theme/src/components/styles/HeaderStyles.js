import styled from 'styled-components';

const HeaderStyles = styled.nav`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  width: 100%;
  height: 90px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.primary.veryLight};
  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 0;
    background: none;
    cursor: pointer;
    height: 100%;
    width: 70px;
    height: 70px;
    color: ${props =>
      props.transparent
        ? props.theme.colors.greys.white
        : props.theme.colors.greys.black};
    margin: 0;
    padding: 10px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${props => props.theme.colors.primary.medium};
    }
  }
  background: ${props => (props.transparent ? 'transparent' : 'white')};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 200ms ${props => (props.show ? 'ease-in' : 'ease-out')};
  transform: ${props => (props.show ? 'none' : 'translate(0, -100%)')};

  ul {
    display: flex;
  }

  .search-button {
    border-radius: 50%;
    align-self: flex-end;
  }

  .badge {
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center center;
    border-radius: 20px;
    position: absolute;
    top: 15px;
    left: 40px;
    color: white;
    background: ${props => props.theme.colors.accent.medium};
    font-size: 0.8em;
  }

  .social-links {
    width: 150px;
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      display: none;
    }
  }
`;

export default HeaderStyles;
