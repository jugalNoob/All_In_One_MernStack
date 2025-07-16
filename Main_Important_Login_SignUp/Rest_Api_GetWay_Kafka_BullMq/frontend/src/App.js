import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Home from './page/Home';
import Redis from './page/Redis';
import GetAdv from './page/GetAdv';
import Delete from './page/Delete';
import Update from './page/Update';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/redis',
    element: <Redis />,
  },
  {
    path: '/get-adv',
    element: <GetAdv />,
  },
  {
    path: '/delete/:id',
    element: <Delete />,
  },
  {
    path: '/update/:id',
    element: <Update />,
  },
  
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
