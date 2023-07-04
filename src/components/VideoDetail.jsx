import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fetchFromAPI } from "../utils/FetchFromAPI";
import { styled } from "@mui/material/styles";
import Loader from "./Loader";
import {
  demoThumbnailUrl,
  demoChannelUrl,
  demoVideoUrl,
  demoChannelTitle,
  demoVideoTitle,
} from "../utils/constants";
import Comments from "./Comments";
import { useMediaQuery } from "@mui/material";


const StyledBox = styled(Box)`
  width: 500px;
  box-shadow: none;
  border-radius: 0px;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media screen and (max-width: 800px) {
    justify-content: flex-start !important;
    width: 100%;
  }

  @media screen and (max-width: 450px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Styledcomnt = styled(Box)`
  @media screen and (max-width: 870px) {
    flex-direction: column-reverse;
  }
`;

const VideoDetail = () => {

  const isLargeS45 = useMediaQuery("(max-width:450px)");
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

// ...

useEffect(() => {
  fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
    setVideoDetail(data.items[0])
  );

  fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
    (data) => setVideos(data.items)
  );

}, [id]);




  if (!videoDetail?.snippet) return <Loader />;
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;



 
  


  return (
    <Box minHeight="95vh">
      <Stack direction="column">
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              p={2}
              style={{ flexDirection: "column" }}
            >
              <Typography color="#fff" variant="h5" fontWeight="bold">
                {title}
              </Typography>
              <Link to={`/channel/${channelId}`}>
                <Typography sx={{ sm: "subtitle1", md: "h6" }} color="#fff">
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Styledcomnt
          style={{
            display: "flex",
            justifyContent: "space-betwen",
            gap: "10px",
            padding: "0px 1rem",
          }}
        >
          <Comments id={id} />
          <Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              {videos.length > 0 ? (
                videos.map((item, index) => (
                  <StyledBox key={index}>
                    <Link
                      to={
                        item?.id?.videoId
                          ? `/video/${item.id.videoId}`
                          : demoVideoUrl
                      }
                    >
                      <img
                        src={
                          item?.snippet?.thumbnails?.medium?.url ||
                          demoThumbnailUrl
                        }
                        alt={item?.snippet?.title}
                        style={{
                          borderRadius: "10px",
                          width: isLargeS45 ? "100%" : "200px",
                        }}
                      />
                    </Link>
                    <CardContent>
                      <Link
                        to={
                          item?.snippet?.channelId
                            ? `/channel/${item.snippet.channelId}`
                            : demoChannelUrl
                        }
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color="#FFF"
                        >
                          {item?.snippet?.title.slice(0, 60) ||
                            demoVideoTitle.slice(0, 60)}
                        </Typography>
                      </Link>
                      <Link
                        to={
                          item?.snippet?.channelId
                            ? `/channel/${item.snippet.channelId}`
                            : demoChannelUrl
                        }
                      >
                        <Typography variant="subtitle2" color="gray">
                          {item?.snippet?.channelTitle || demoChannelTitle}
                          <CheckCircleIcon
                            sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                          />
                        </Typography>
                      </Link>
                    </CardContent>
                  </StyledBox>
                ))
              ) : <Loader/> }
            </Box>
          </Box>
        </Styledcomnt>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
