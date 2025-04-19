import React from 'react'
import { Outlet } from 'react-router-dom'
import NavComponent from '../Nav/Nav.Component.jsx'

export default function Layout() {
  return (
    <div>
        <NavComponent/>
        <Outlet/>
        
    </div>
  )
}
