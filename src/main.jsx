import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './legacy/legacy.css';

createRoot(document.getElementById('app-root')).render(<App />);
