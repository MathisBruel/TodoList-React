import React from 'react';
import ReactDOM from 'react-dom/client';
import './Web/index.css';
import App from './Web/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
