import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/AuthContext';
import './Styles/variables.css';
import './Styles/auth.css';
import './Styles/layout.css';
// import  BookRecycling from './mainpage';
// import HomePage from './Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotebookApp from './product';
import NotebookCustomizer from './App';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* < HomePage /> */}
    
    {/* <BookRecycling   /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



