import React from 'react';
import ReactDOM from 'react-dom/client';  // Importação de 'react-dom/client' para usar 'createRoot'
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Usando createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
