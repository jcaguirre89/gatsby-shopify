import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { classnames } from 'tailwindcss-classnames';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

export default function Nav({ className }) {
  const [isCollectionsExpanded, setCollectionsExpanded] = useState(false);
  const dispatch = useContext(GlobalDispatchContext);
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            storePath
            collectionsPath
          }
        }
      }
      collections: allShopifyCollection {
        nodes {
          handle
          title
        }
      }
    }
  `);
  const {
    storePath,
    collectionsPath,
  } = data.site.siteMetadata.gatsbyStorefrontConfig;
  const {
    collections: { nodes: collections },
  } = data;
  const collectionLinks =
    collections &&
    collections.length > 0 &&
    collections.map(collection => (
      <li className="block text-base">
        <Link
          to={`${collectionsPath}/${collection.handle}/`}
          onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
          className="block focus:bg-indigo-300 focus:outline-none"
        >
          {collection.title}
        </Link>
      </li>
    ));
  const LinkStyle = classnames('px-2 md:ml-1');
  return (
    <ul className={className}>
      <li>
        <Link
          className={classnames(LinkStyle, 'text-indigo-700')}
          to={`${storePath}`}
        >
          Store
        </Link>
      </li>
      <li>
        <div className="relative">
          <button
            type="button"
            className={classnames(LinkStyle, 'flex items-baseline')}
            onClick={() => setCollectionsExpanded(!isCollectionsExpanded)}
          >
            <span>Collections</span>
            <span className="ml-3">
              <svg
                className="h-5 w-5 stroke-current text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isCollectionsExpanded ? (
                  <path d="M19 9l-7 7-7-7"></path>
                ) : (
                  <path d="M9 5l7 7-7 7"></path>
                )}
              </svg>
            </span>
          </button>
          <div
            className={classnames(
              isCollectionsExpanded ? 'block' : 'hidden',
              'px-2'
            )}
          >
            <ul>{collectionLinks}</ul>
          </div>
        </div>
      </li>
      <li>
        <Link className={LinkStyle} to="/about">
          About
        </Link>
      </li>
    </ul>
  );
}

Nav.propTypes = {
  className: PropTypes.string,
};

Nav.defaultProps = {
  className: '',
};
