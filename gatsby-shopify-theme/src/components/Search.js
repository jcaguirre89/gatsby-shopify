import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { Index } from 'elasticlunr';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';
import SearchStyles from './styles/SearchStyles';

export default function Search() {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            storePath
          }
        }
      }
      siteSearchIndex {
        index
      }
    }
  `);
  const { storePath } = data.site.siteMetadata.gatsbyStorefrontConfig;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { isSearchOpen } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  let index;

  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on input on render
    if (isSearchOpen) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const escFunction = useCallback(
    event => {
      if (isSearchOpen && event.keyCode === 27) {
        dispatch({ type: 'TOGGLE_SEARCH' });
      }
    },
    [isSearchOpen]
  );

  useEffect(() => {
    // CLose on esc press
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const getOrCreateIndex = () =>
    index || Index.load(data.siteSearchIndex.index);

  const search = e => {
    const q = e.target.value;
    index = getOrCreateIndex();
    setQuery(q);
    setResults(
      index
        .search(q, { expand: true })
        .map(({ ref }) => index.documentStore.getDoc(ref))
    );
  };

  const trimDesc = (content, wordlimit) => {
    const filter = content.replace(/\s+/g, ' ');
    const wordsarr = filter.split(' ');

    if (wordsarr.length < wordlimit) return content;

    let result = '';
    for (let i = 0; i < wordlimit; i++) {
      result = `${result} ${wordsarr[i]} `;
    }
    result = `${result}...`;
    return result;
  };

  return (
    <SearchStyles open={isSearchOpen}>
      <button
        className="close-button"
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
      >
        <FaLongArrowAltLeft size={30} />
      </button>
      <input
        type="text"
        name="search"
        value={query}
        ref={inputRef}
        placeholder="Search products"
        onChange={e => search(e)}
      />
      <ul>
        {results.map(result => (
          <Link
            key={result.handle}
            to={`/${storePath}/${result.handle}`}
            onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
          >
            <li>
              <div className="results">
                <h3>{result.title}</h3>
                <p>{trimDesc(result.description, 10)}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </SearchStyles>
  );
}
