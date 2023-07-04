import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import {fetchFromAPI} from '../utils/FetchFromAPI'


const Feed = () => {


  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    setVideos(null);
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
    .then((data) => setVideos(data.items))
  }, [selectedCategory]);
  
 

  return ( 
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3b3b3b",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        />
        <Typography
          variant="body2"
          className="copyright"
          sx={{ mt: "1.5", color: "#fff" }}
        >
          Copyright 2023 NDM Media
        </Typography>
      </Box>
      <Box p={2} sx={{overflowY:'auto',height:'90vh',flex:2}}>
        <Typography variant="h4" fontWeight={'bold'}>
          {selectedCategory} <span style={{color:'#F31503'}} mb={2}>
            videos
          </span>
        </Typography>
        <Videos video={videos}/>
      </Box>
    </Stack>
  );
};

export default Feed;
