import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {AuthProvider} from "react-auth-kit";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <AuthProvider authType={"cookie"}
                      authName={"_auth"}
                      cookieDomain={window.location.hostname}
                      cookieSecure={false}
        >
            <App/>
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
