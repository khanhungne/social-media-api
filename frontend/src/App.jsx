import { useState } from 'react'
import LoginCard from './components/auth/LoginCard'
import SignUpCard from './components/auth/SignupCard'
import LeftSideBar from './components/LeftSideBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <LeftSideBar/>
    </>
  )
}

export default App
