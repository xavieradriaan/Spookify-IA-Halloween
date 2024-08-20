import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import './App.css'; // Importar el archivo CSS

function App() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/sound/your-sound-file.mp3');
    audio.loop = true; // Repetir la pista de sonido
    audioRef.current = audio;
  }, []);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'processed_image.jpg');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/app" element={
          <div className="app-container">
            <h1 className="title">Halloween Image Generator</h1>
            <div className="upload-container">
              <input 
                type="file" 
                onChange={handleImageUpload} 
                className="file-input" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
              />
              <button onClick={handleButtonClick} className="upload-button">Select File</button>
              <button onClick={handleSubmit} className="upload-button">Upload and Process</button>
              <button onClick={handlePlayAudio} className="upload-button">Play Sound</button>
            </div>
            <div className="decorations">
              <img src="/pumpkin.png" alt="Pumpkin" className="pumpkin" />
              <img src="/ghost.png" alt="Ghost" className="ghost" />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;