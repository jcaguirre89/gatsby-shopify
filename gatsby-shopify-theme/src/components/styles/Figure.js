import React from 'react';
import { buildImageObj, imageUrlFor } from '../../lib/sanity-helpers';


function Figure(props) {
  return (
    <figure className="w-full m-0">
      {props.asset && (
        <img
          className="w-full max-h-screen m-0 object-cover"
          src={imageUrlFor(buildImageObj(props))
            .width(1200)
            .url()}
          alt={props.alt}
        />
      )}
      <figcaption>{props.caption}</figcaption>
    </figure>
  );
}

export default Figure;
