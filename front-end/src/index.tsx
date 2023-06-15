import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Started from './pages/Started';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import ForYou from "./pages/ForYou";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Started/>,
        children: [
            { path: '/main',element: <Home/> },
            { path: '/for-you', element: <ForYou/> },
            { path: '/saved', element: <Saved/> }
        ]
    }
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
