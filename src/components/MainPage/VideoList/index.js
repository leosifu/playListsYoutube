import React from 'react';

import VideoCard from './VideoCard';

import './videoList.css'

const VideoList = ({videos, addVideoToPlayList, loader, }) => {

  return(
    <div className="container">
      Lista de videos
      <div className="row">
        {
          videos && videos.map(video =>
            <VideoCard video={video} addVideoToPlayList={addVideoToPlayList}/>
          )
        }
      </div>
    </div>
  )
}

export default VideoList;
