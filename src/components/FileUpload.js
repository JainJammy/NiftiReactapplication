import React from 'react';

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      onFileUpload(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" accept=".nii,.nii.gz" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
