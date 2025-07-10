import React from 'react'
import { NavLink } from 'react-router-dom'


function Home() {
  return (
    <div>
      <NavLink to="/">home</NavLink>
      <br />
      <br />

      <NavLink to="/cpu">cpu</NavLink>

      <br />
      <br />
      <NavLink to="/req">req</NavLink>
      <br />
      <br />
      <NavLink to="/network">network</NavLink>
      <br />
      <br />
      <NavLink to="/folder">folder</NavLink>
      <br />
      <br />
      <NavLink to="/storage">storage</NavLink>
      <br />
      <br />
      <NavLink to="/Uptime">Uptime</NavLink>
    </div>
  )
}

export default Home
