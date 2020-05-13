import styled from 'styled-components';

const CollectionsGrid = styled.div`
  margin: 50px 0;
  width: 100%;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, 500px);
  grid-gap: 20px;

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    grid-template-columns: 1fr;
  }

  main {
    font-size: 3rem;
    &:nth-child(4n) {
      margin: 20px 40px;
      grid-column: 1/2;
    }
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      grid-column: 1/2;
    }
  }
  a {
    grid-column: 1/2;
    &:nth-child(3n) {
      grid-column: 2/3;
    }
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      &:nth-child(3n) {
        grid-column: 1/2;
      }
    }
  }
`;

export default CollectionsGrid;
