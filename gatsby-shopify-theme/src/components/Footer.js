import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Logo from './Logo';
import SocialLinks from './SocialLinks';
import FooterStyles from './styles/FooterStyles';

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          email
          phone
        }
      }
    }
  `);
  const { email, phone, title } = data.site.siteMetadata;
  return (
    <div className="h-80 lg:h-40 grid grid-rows-3 lg:grid-cols-3 transform translate-y-20 lg:translate-y-36">
      <Link to="/">
        <Logo color="black" />
      </Link>
      <div>
        <h3>Have Questions?</h3>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
      <div className="social-copyright">
        <SocialLinks size="20px" />
        <p>
          © {new Date().getFullYear()} {title}
        </p>
      </div>
    </div>
  );
}
