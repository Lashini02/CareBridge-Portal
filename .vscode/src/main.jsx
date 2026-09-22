import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@asgardeo/auth-react';
import App from './App';
import './index.css';

const authConfig = {
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "UCkPHhvOUGwj5T0kHRGpHZ2i_sQa", 
  baseUrl: "https://api.asgardeo.io/t/org08ibz", 
  scope: ["openid", "profile", "groups", "roles"]
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);