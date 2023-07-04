import { Box } from '@mui/material'
import React from 'react'
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import  Feed  from './components/Feed'
import ChannelDetail from './components/ChannelDetail'
import SearchFeed from './components/SearchFeed'
import VideoDetail from './components/VideoDetail'

const App = () => {


  return (

<BrowserRouter>

   <Box sx={{background:'#282828',color:'white'}}>
    <Navbar/>
    <Routes>
     <Route path='/' element={<Feed/>}/>
     <Route path='/video/:id' element={<VideoDetail/>}/>
     <Route path='/channel/:id' element={<ChannelDetail/>}/>
     <Route path='/Search/:searchTerm' element={<SearchFeed/>}/>
    </Routes>
   </Box>
</BrowserRouter>
  )
}

export default App