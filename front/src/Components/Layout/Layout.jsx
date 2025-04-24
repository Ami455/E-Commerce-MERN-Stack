import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavComponent from '../Nav/Nav.Component.jsx'
import Footer from '../Footer/Footer.jsx'

export default function Layout() {
  const location = useLocation();

  const hideFooterRoutes = ["/admin"]; // add more if needed

  const shouldHideFooter = hideFooterRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <NavComponent />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </>
  );
}
 