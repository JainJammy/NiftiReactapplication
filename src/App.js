//using Nifti reader js to load the sub-PAT27_T1w.nii but Nifiti reader js
//is not accurate libaray as mentioned in the libaray isCompressed method but it showing
//Nifti js link
//https://www.npmjs.com/package/nifti-reader-js
//error
import React, { useState } from 'react';
import nifti from 'nifti-reader-js';
import FileUpload from './components/FileUpload';
import ImageDisplay from './components/ImageDisplay';
import SliceSlider from './components/SliceSlider';

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [currentSlice, setCurrentSlice] = useState(0);
  const [maxSlices, setMaxSlices] = useState(0);
  const [imageDataUrl, setImageDataUrl] = useState(null);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      let buffer = event.target.result;
      console.log("Nifit libaray exist",nifti)//libaray exist to print object on console showing undefined
      //Nifti reader js libaray is not accurate 
      //it is showing error on isCompressed method as mentioned in isCompressed method
      //in the libaray but showing error
      //Nifti reader js link
      //https://www.npmjs.com/package/nifti-reader-js
      if (nifti.isCompressed(buffer)) {
        buffer = nifti.decompress(buffer);
      }
      if (nifti.isNIFTI(buffer)) {
        const niftiHeader = nifti.readHeader(buffer);
        const niftiImage = nifti.readImage(niftiHeader, buffer);
        const dimensions = niftiHeader.dims;
        setMaxSlices(dimensions[3]);
        setImageData({ niftiImage, dimensions });
        renderSlice(0, niftiImage, dimensions);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const renderSlice = (slice, niftiImage, dimensions) => {
    const sliceSize = dimensions[1] * dimensions[2];
    const start = slice * sliceSize;
    const end = start + sliceSize;
    const sliceData = new Uint8ClampedArray(sliceSize);
    for (let i = start; i < end; i++) {
      sliceData[i - start] = niftiImage[i];
    }
    const imageData = new ImageData(
      sliceData,
      dimensions[1],
      dimensions[2]
    );
    const canvas = document.createElement('canvas');
    canvas.width = dimensions[1];
    canvas.height = dimensions[2];
    const context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);
    setImageDataUrl(canvas.toDataURL());
  };

  const handleSliceChange = (slice) => {
    setCurrentSlice(slice);
    renderSlice(slice, imageData.niftiImage, imageData.dimensions);
  };

  return (
    <div>
      <h1>NIfTI Image Viewer</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {imageData && (
        <>
          <ImageDisplay imageDataUrl={imageDataUrl} />
          <SliceSlider
            maxSlices={maxSlices}
            currentSlice={currentSlice}
            onSliceChange={handleSliceChange}
          />
        </>
      )}
    </div>
  );
};

export default App;
