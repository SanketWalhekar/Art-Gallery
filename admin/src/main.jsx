
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import your App component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter> {/* Only wrap here in the root */}
    <App /> {/* Your App component */}
  </BrowserRouter>
);
