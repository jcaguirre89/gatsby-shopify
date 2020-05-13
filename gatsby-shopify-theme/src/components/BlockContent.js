import BaseBlockContent from '@sanity/block-content-to-react';
import React from 'react';
import { classnames } from 'tailwindcss-classnames';
import Figure from './styles/Figure';

const BaseHeading = classnames('my-3');

const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        case 'h1':
          return <h1 className={BaseHeading}>{props.children}</h1>;

        case 'h2':
          return <h2 className={BaseHeading}>{props.children}</h2>;

        case 'h3':
          return <h3 className={BaseHeading}>{props.children}</h3>;

        case 'h4':
          return <h4 className={BaseHeading}>{props.children}</h4>;

        case 'blockquote':
          return <blockquote>{props.children}</blockquote>;

        default:
          return <p className="max-w-md">{props.children}</p>;
      }
    },
    figure(props) {
      return <Figure {...props.node} />;
    },
  },
};

const BlockContent = ({ blocks }) => (
  <BaseBlockContent
    className="w-full"
    blocks={blocks}
    serializers={serializers}
  />
);

export default BlockContent;
