import React from 'react';

const SliceSlider = ({ maxSlices, currentSlice, onSliceChange }) => {
  return (
    <div>
      <input
        type="range"
        min="0"
        max={maxSlices - 1}
        value={currentSlice}
        onChange={(e) => onSliceChange(parseInt(e.target.value, 10))}
      />
      <p>Slice: {currentSlice + 1} / {maxSlices}</p>
    </div>
  );
};

export default SliceSlider;
