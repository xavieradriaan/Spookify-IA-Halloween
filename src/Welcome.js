import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Reutilizar el archivo CSS

function Welcome() {
  return (
    <div className="app-container">
      <h1 className="title">BWelcome to the Halloween Image Generator</h1>
      <div className="welcome-container">
        <p>Brace yourself for a scary experience! </p>
        <Link to="/app" className="start-button">Hell Here</Link>
      </div>
      <div className="decorations">
        <img src="/pumpkin.png" alt="Pumpkin" className="pumpkin" />
        <img src="/ghost.png" alt="Ghost" className="ghost" />
      </div>
    </div>
  );
}

export default Welcome;