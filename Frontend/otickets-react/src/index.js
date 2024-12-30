import React from 'react';
import ReactDOM from 'react-dom/client';  // Só importa o ReactDOM
import App from './App'
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
