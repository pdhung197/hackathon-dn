import React, { useState } from 'react';

type HImageProps = {
  source: string;
  title?: string;
};

export const HImage = ({ source, title = '' }: HImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const handleImageLoaded = () => setLoaded(true);

  return <img src={source} alt={title} onLoad={handleImageLoaded} />;
};
{
  /* <>
      {!loaded && (
        <img
          src={require('./../../assets/img/default-avatar.png')}
          alt={title}
        />
      )}
      
	</> */
}
