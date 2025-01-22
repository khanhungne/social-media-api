import React from 'react';
import { Container, Box } from '@mui/material';
import { useState } from 'react'
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { Navigate, Routes, Route, useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
function App() {
  const [count, setCount] = useState(0)
  const user = useRecoilValue(userAtom)
  const { pathname } = useLocation();

  return (
    <>
        <Container>
        <Routes>
          <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
