import React from 'react'
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"
import { Outlet } from 'react-router-dom'

const Layout = () => {


  return (
    <main className="App">
      <Navigation />
      <Outlet />
      <Footer />
    </main>
  )
}

export default Layout