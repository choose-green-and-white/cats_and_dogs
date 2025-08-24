import React, {type JSX} from 'react';

type ButtonsProps = {
  onPlus?: () => void;
  onEquals?: () => void;
  onMinus?: () => void;
  likeImage?: string;   
  nextImage?: string;    
  dislikeImage?: string; 
};

export default function Buttons({
  onPlus,
  onEquals,
  onMinus,
  likeImage,
  nextImage,
  dislikeImage,
}: ButtonsProps): JSX.Element {
  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  };

  const imageStyle: React.CSSProperties = {
    width: '70px',
    height: '70px',
    cursor: 'pointer',
  };

  return (
    <div style={wrapperStyle} aria-label="actions">
      {likeImage && (
        <img
          src={likeImage}
          alt="Like"
          style={imageStyle}
          onClick={onPlus}
        />
      )}
      {nextImage && (
        <img
          src={nextImage}
          alt="Next"
          style={imageStyle}
          onClick={onEquals}
        />
      )}
      {dislikeImage && (
        <img
          src={dislikeImage}
          alt="Dislike"
          style={imageStyle}
          onClick={onMinus}
        />
      )}
    </div>
  );
}