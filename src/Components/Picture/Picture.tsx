import React from 'react';

type PictureProps = {
  url?: string | null;   
  alt?: string;        
  placeholder?: string;    
  style?: React.CSSProperties; 
};

export default function Picture({
  url,
  alt = 'Изображение',
  placeholder = 'Нет изображения',
  style,
}: PictureProps): JSX.Element {
  if (!url) {
    return <div>{placeholder}</div>;
  }

  return (
    <img
      src={url}
      alt={alt}
      style={{
        maxWidth: 640,
        maxHeight: 480,
        width: 'auto',
        height: 'auto',
        ...(style || {}),
      }}
    />
  );
}
