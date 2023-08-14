import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { useToggleImageLoading } from 'context/ImageLoaderProvider';
import { v4 as uuidv4 } from 'uuid';

const Image = props => {
  const toggleLoadImage = useToggleImageLoading();

  const [isLoading, setIsLoading] = useState(true);
  const idRef = useRef(uuidv4());
  useEffect(() => {
    const image = idRef.current;

    if (isLoading) {
      toggleLoadImage(image); // start
    } else {
      toggleLoadImage(image); // start
    }
  }, [isLoading, toggleLoadImage]);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      {...props}
      onLoad={() => {
        setIsLoading(false);
      }}
      onError={() => {
        setIsLoading(false);
      }}
    />
  );
};

Image.propTypes = {};

export default Image;
