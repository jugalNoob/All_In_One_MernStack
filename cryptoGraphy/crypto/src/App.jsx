import React from 'react'
import {
  createBrowserRouter, RouterProvider
} from  "react-router";


import Home from "./page/Home"
import Sha from './page/Sha';
import Encryption from './page/Encryption';




const router=createBrowserRouter([  /// install react router https://medium.com/@adebayosilas/introduction-to-react-router-v6-4-6-11-1-f56c7710282e
  
  {

    path:'/',
    element:<Home/>
  },

  {

    path:'/sha',
    element:<Sha/>
  },

  {
    path:"/encryption",
    element:<Encryption/>
  }
])

function App(){
  return <RouterProvider router={router} />
}
export default App