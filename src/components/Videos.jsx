import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelDetail from './ChannelCard';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Videos = ({ video }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const isError = !video || video.length === 0;

  useEffect(() => {
    if (!isError) {
      handleClose();
    }
  }, [isError]);

  return (
    <>
      <Stack direction='row' flexWrap='wrap' justifyContent='center' alignItems='center' gap={2}>
        {!isError ? (
          video.map((item, index) => (
            <Box key={index}>
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelDetail channel={item} />}
            </Box>
          ))
        ) : (
          <Backdrop sx={{ color: '#032c6e', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
            <CircularProgress color='inherit' />
          </Backdrop>
        )}
      </Stack>
    </>
  );
};

export default Videos;
