import styled from 'styled-components';

const FooterStyles = styled.div`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  place-items: center;

  .social-copyright {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default FooterStyles;
