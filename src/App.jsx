import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import Layout from './Layout/Home/Home'
import Home from './Pages/Home/Home'
import TaskPage from './Pages/Task/Task'

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home/>} />
          <Route path="task" element={<TaskPage/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
