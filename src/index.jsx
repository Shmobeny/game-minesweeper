import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App ref={React.createRef()}/>
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log("Service Worker registered"))
    .catch(err => console.log("Service Worker NOT registered", err))
}