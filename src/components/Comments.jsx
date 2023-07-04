import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/FetchFromAPI';
import { Box, Typography } from '@mui/material';

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`)
      .then((data) => setComments(data.items))
      .catch((error) => console.error(error));
  }, [id]);



  return (
    <>
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Typography>
        Commends {comments.length}
      </Typography>
        {comments.map((item, index) => (
          <Box key={index} style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user" style={{borderRadius:'50px'}}/>
           <Box>
           <Typography>{item.snippet.topLevelComment.snippet.authorDisplayName}</Typography>
            <Typography>{item.snippet.topLevelComment.snippet.textDisplay}</Typography>
           </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Comments;
