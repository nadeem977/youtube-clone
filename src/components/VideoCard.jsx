import React from 'react'
import { Typography ,Card ,CardContent, CardMedia} from '@mui/material'
import {  demoChannelUrl ,demoVideoUrl , demoChannelTitle, demoVideoTitle } from '../utils/constants'
import { Link } from 'react-router-dom'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from '@mui/material/styles';


const StyledCard = styled(Card)`
  box-shadow: none;
  border-radius: 0;
  width: 300px;
  background:transparent;

  @media screen and (max-width: 1200px) {
    width:280px;
  }
  @media screen and (max-width: 650px) {
    width:200px;
    height:auto;
  }
  @media screen and (max-width: 450px) {
    width:100%;

  }
`;

const StyledCardMedia = styled(CardMedia)`
width:358px;
height:180px;
  @media screen and (max-width: 1100px) {
    width: 100%;
    height:160px;
  }
  @media screen and (max-width: 650px) {
    height:130px;
  }

  @media screen and (max-width: 450px) {
    width:100% !important;
    height:180px !important;
    min-width: 247px;
  }
`;

const StyledCardContent = styled(CardContent)`
height:'106px'
  @media screen and (max-width: 650px) {
    background:transparent;
  }
  @media screen and (max-width: 450px) {
    height:auto;
  }
`;


const VideoCard = ({video: { id: { videoId }, snippet }}) => {

  return (
    <StyledCard>
        <Link to={videoId ? `/video/${videoId}`:demoVideoUrl}>
        <StyledCardMedia image={snippet?.thumbnails?.high?.url }
        alt={snippet?.title}
        />
        </Link>
        <StyledCardContent sx={{background:'#1e1e1e',height:'106px'}}>
         <Link to={videoId ? `/video/${videoId}`:demoVideoUrl}>
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            </Typography>
         </Link>
         <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
        <Typography variant="subtitle2" color="gray">
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
        </Typography>
      </Link>
        </StyledCardContent>
    </StyledCard>
  )
}

export default VideoCard