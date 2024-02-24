import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploadMessage, setUploadMessage] = useState(''); // Separate state for upload messages
  const [downloadMessage, setDownloadMessage] = useState(''); // Separate state for download messages

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleUpload = async () => {
    setDownloadMessage(''); // Clear download message before upload
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadMessage(response.data.message); // Update upload message
    } catch (error) {
      setUploadMessage(error.response ? error.response.data.error : "Error: " + error.message); // Update upload message on error
    }
  };

  const downloadFile = async () => {
    setUploadMessage(''); // Clear upload message before download
    try {
      const response = await axios.get(`http://127.0.0.1:5000/downloads/${fileName}`, { responseType: 'blob' });
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Set the file name
      document.body.appendChild(link);
      link.click();
      setDownloadMessage("File successfully downloaded."); // Update download message
    } catch (error) {
      setDownloadMessage("Failed to download file"); // Update download message on error
    }
  };

  return (
    <div className="App">

      <header className="App-header">
        <h1>Rubric Converter 📝</h1>
        <h3>Welcome Educators!</h3>
        <p className="App-introduction"> Swtiching to Canvas from Google Classroom?</p>
        <p className="App-introduction">Tired of remaking rubrics?</p>
        <p className="App-introduction">Use this app to convert Google Classroom rubrics to Canvas rubrics in 3 easy steps.</p>
        <p>👇 <strong>Scroll down to begin converting.</strong>👇</p>
      </header>

      <div className="step">
        <h2>Step 1 📁: Select your file by clicking "choose a file" button below.</h2>
        <input id="file" className="hidden-input" type="file" onChange={handleFileChange} />
        <label htmlFor="file" className="file-input-label">Choose a file</label>
        <p>Selected file: {fileName || "No file chosen"}</p>
        <p>👇 Scroll to step 2👇</p>
      </div>


      <div className="step">
        <h2>Step 2 📄: Upload Your File by clicking the  "Upload" button below.</h2>
        <button className="button-upload" onClick={handleUpload}>Upload</button>
        {uploadMessage && <p>{uploadMessage}</p>} {/* Display upload message */}
        <p>👇 Scroll to the final step 👇</p>
      </div>


      <div className="step">
        <h2>Step 3 🏁: Download Your Converted File by clicking "Download File" below.</h2>
        <button className="button-upload" onClick={downloadFile} disabled={!fileName}>Download File</button>
        {downloadMessage && <div>{downloadMessage}</div>} {/* Display download message */}
        <p className="App-introduction">Thank you for using Rubric Converter!</p>

        <p>by</p>
        <p>Russell Navas</p>
        <p>a very sleepy chemistry teacher ⚛️</p>
        
      </div>
    </div>
  );
}

export default App;
