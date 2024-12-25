import { Box } from '@mui/material'
import './App.css'
import Appbar from './components/Appbar'
import Home from './pages/Home'
import ChatBot from './components/UI/ChatBot'


function App() {
  return (
    <Box sx={{position:"relative"}} >
      <Appbar />
      <Home />
      <ChatBot/>
    </Box>
  )
}

export default App
