import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { FaInstagram, FaFacebookSquare, FaTwitter } from 'react-icons/fa';
import { classnames } from 'tailwindcss-classnames';

const Wrapper = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  a {
    margin-right: 10px;
    font-size: ${props => props.size};
    color: ${props => props.color};
    &:hover {
      color: ${props => props.theme.colors.primary.medium};
    }
  }
`;

export default function SocialLinks({ additionalStyles }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          instagramHandle
          facebookHandle
          twitterHandle
        }
      }
    }
  `);
  const {
    instagramHandle,
    facebookHandle,
    twitterHandle,
  } = data.site.siteMetadata;

  const BaseStyles = classnames('block flex p-1 ');
  const IconStyles = classnames('flex-1 p-1 text-2xl');
  return (
    <ul className={classnames(BaseStyles)}>
      {instagramHandle && (
        <a
          className={classnames(IconStyles, additionalStyles)}
          href={`https://www.instagram.com/${instagramHandle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      )}
      {facebookHandle && (
        <a
          className={classnames(IconStyles, additionalStyles)}
          href={`https://www.facebook.com/${facebookHandle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare />
        </a>
      )}
      {twitterHandle && (
        <a
          className={classnames(IconStyles, additionalStyles)}
          href={`https://www.twitter.com/${twitterHandle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
      )}
    </ul>
  );
}

SocialLinks.propTypes = {
  additionalStyles: PropTypes.string,
};

SocialLinks.defaultProps = {
  additionalStyles: '',
};
