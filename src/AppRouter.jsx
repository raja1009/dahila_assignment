import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'

const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route exact path = '/' element = {<Login/>}/>
        <Route exact path = '/home' element = {<Home/>}/>
    </Routes>
    </>
  )
}

export default AppRouter