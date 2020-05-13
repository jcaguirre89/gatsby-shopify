import PropTypes from 'prop-types';
import React from 'react';
import CollectionCard from './CollectionCard';
import CollectionStyles from './styles/CollectionsStyles';

export default function CollectionList({ collections }) {
  return (
    <CollectionStyles>
      {collections
        .filter(c => !!c.image)
        .map(collection => (
          <CollectionCard key={collection.handle} collection={collection} />
        ))}
    </CollectionStyles>
  );
}

CollectionList.propTypes = {
  collections: PropTypes.array.isRequired,
};
