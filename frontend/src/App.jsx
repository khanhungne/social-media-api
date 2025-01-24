import React from 'react';
import { Container, Box } from '@mui/material';
import { useState } from 'react'
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { Navigate, Routes, Route, useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LeftSideBar from "./components/LeftSideBar"
import TestThreadPage from "./components/posts/TestThreadPage"
function App() {
  const [count, setCount] = useState(0)
  const user = useRecoilValue(userAtom)
  const { pathname } = useLocation();
  
  return (
    <>
      <Container sx={{ display: "flex" }}>
        {user && <LeftSideBar />}
        <Box sx={{ flex: 1 ,marginLeft: user ? 64 : 0, overflowY: 'auto' }}>
          <Routes>
            <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
            <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
            <Route path="/test-thread" element={<TestThreadPage />} />
          </Routes>
        </Box>
      </Container>
    </>
  )
}

export default App
