import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './page/Home';
import Cpu from "./page/Cpu"
import Req from './page/Req';
import Network from "./page/Network"
import Folder from "./page/Folder"
import Storage from './page/Storage';
import Uptime from "./page/Uptime"

const router = createBrowserRouter([ 
  {
    path: "/", 
    element: <Home />
  },

  {
    path: "/cpu", 
    element: <Cpu/>
  },
  {
    path: "/req", 
    element: <Req/>
  },

  {
    path: "/network", 
    element: <Network/>

  },


  {
    path: "/folder", 
    element: <Folder/>
  },

  {

    path:"/Uptime",
element:<Uptime></Uptime>
  },

  
  {

    path:"/storage",
element:<Storage></Storage>
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
