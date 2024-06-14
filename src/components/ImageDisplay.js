import React from 'react';

const ImageDisplay = ({ imageDataUrl }) => {
  return (
    <div>
      {imageDataUrl ? (
        <img src={imageDataUrl} alt="NIfTI Slice" style={{ width: '100%' }} />
      ) : (
        <p>No image loaded</p>
      )}
    </div>
  );
};

export default ImageDisplay;
