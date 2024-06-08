import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Home.css'

const Layout = (children) => {
  return (
    <>
    
    <div class="flex h-screen">
      <Sidebar/>
      <main className=''>
      < Outlet />
      </main>
    </div>
    
    </>
  )
}

export default Layout