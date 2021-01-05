import React, { useState } from 'react';

type HImageProps = {
  source: string;
  title?: string;
};

export const HImage = ({ source, title = '' }: HImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const handleImageLoaded = () => setLoaded(true);

  const defaultImgStyle = {
    height: !loaded ? 'auto' : 0,
  };

  const imgStyle = {
    height: loaded ? 'auto' : 0,
  };

  return (
    <>
      {!loaded && (
        <img
          style={defaultImgStyle}
          src={require('./../../assets/img/default-avatar.png')}
          alt={title}
        />
      )}
      <img
        style={imgStyle}
        src={source}
        alt={title}
        onLoad={handleImageLoaded}
      />
    </>
  );
};
