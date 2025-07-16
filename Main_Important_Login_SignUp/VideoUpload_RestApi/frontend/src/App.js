import React from 'react'
import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom'

import Home from './page/Home';
import VideoUploader from './page/VideoUploader';
import VideoList from './page/VideoList.jsx';
import VideoPlayer from "./page/VideoPlayer.jsx"




const router=createBrowserRouter([  /// install react router https://medium.com/@adebayosilas/introduction-to-react-router-v6-4-6-11-1-f56c7710282e
  
  {

    path:'/',
    element:<Home/>
  },

  {
    path:'/Videolist',
    element:<VideoList/>
  },

  {
    path:'/VideoUploader',
    element:<VideoUploader/>
  },

  {
   path: '/video/:filename',
    element: <VideoPlayer />,
  }
  

])

function App(){
  return <RouterProvider router={router} />
}
export default App