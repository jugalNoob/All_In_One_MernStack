import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dash from './page/Dash';
import DashboardG from './page/DashboardG';
import Forget from './page/Forget';
import From from './page/From';
import Home from './page/Home';
import Nav from './page/Nav';
import Login from './page/Login';
import Admin from './page/Admin'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/from", element: <From /> },
      { path: "/login", element: <Login /> },
      { path: "/dash", element: <Dash /> },
      { path: "/forget", element: <Forget /> },
      { path: "/dashboardg", element: <DashboardG /> }, // lowercase recommended
        { path: "/admin", element: <Admin/> }, // lowercase recommended
      { path: "*", element: <h1>404 - Page Not Found</h1> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
