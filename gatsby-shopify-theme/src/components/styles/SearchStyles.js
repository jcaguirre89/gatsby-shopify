import styled from 'styled-components';

const SearchStyles = styled.div`
  position: fixed;
  top: 90px;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px 100px 1fr;
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
  ul {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    list-style: none;
    padding: 0 20px;
    margin: 0;

    h3 {
      margin: 0;
      margin-bottom: 5px;
    }
    p {
      margin: 0;
    }
  }

  li {
    padding: 0;
    margin-bottom: 10px;
    color: black;
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
  input {
    width: 90%;
    font-size: 2rem;
    margin: auto;
    padding: 15px;
    height: 50px;
    display: block;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.greys.dark};
    color: ${props => props.theme.colors.accent.dark};
  }

  input:focus {
    border-bottom: 2px solid ${props => props.theme.colors.primary.medium};
  }

  .results {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      color: ${props => props.theme.colors.greys.veryDark};
    }
    h3 {
      color: ${props => props.theme.colors.primary.veryDark};
    }
  }
`;

export default SearchStyles;
