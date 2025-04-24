import React from 'react'
import { Outlet } from 'react-router-dom'
import NavComponent from '../Nav/Nav.Component.jsx'
import Footer from '../Footer/Footer.jsx'

export default function Layout() {
  return (
    <>
      <NavComponent/>

      <Outlet/>
      <Footer/>

    </>
  )
}
