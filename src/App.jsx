import { Box } from '@mui/material'
import './App.css'
import Appbar from './components/Appbar'
import Home from './pages/Home'

function App() {
  return (
    <Box sx={{position:"relative"}} >
      <Appbar />
      <Home />
    </Box>
  )
}

export default App
