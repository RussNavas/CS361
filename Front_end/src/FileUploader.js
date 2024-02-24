import React, { useState } from 'react';

const FileUploader = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/uploads', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File successfully uploaded');
        onUpload(selectedFile); // Pass uploaded file to parent component
        setSelectedFile(null);
        setFileName('');
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Upload error');
    }
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileChange} />
      <label htmlFor="file" className="file-input-label">
        Choose a file
      </label>
      <p><strong>Selected file:</strong> {fileName}</p>
      <button className="button-upload" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default FileUploader;
