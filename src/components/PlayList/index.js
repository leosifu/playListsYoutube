import React from 'react';

import PlayListCard from './PlayListCard';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleNextSong, handleDeleteSong, } from '../../redux/actions';

import './PlayList.css';

const PlayList = ({videos, currentVideo, }) => {

  const dispatch = useDispatch();

  const startPlayList = () => {
    if (videos.length > 0) {
      dispatch(handleNextSong(videos[0]))
    }
  }

  const deleteVideo = (event, video) => {
    event.stopPropagation();
    if (currentVideo.id.videoId === video.id.videoId) {
      //Si es la cancion que esta reproduciendose se cambia a la siguiente
      const videoToDeleteIndex = videos.findIndex(song => song.id.videoId === video.id.videoId);
      dispatch(handleNextSong(videos[videoToDeleteIndex+1]))
    }
    dispatch(handleDeleteSong(video));
  }

  return(
    <div className="container vertical-scrollable">
      <div className="row">
        <div className="col-4">
          Mi Playlist
        </div>
        <div className="col-8">
          <button className="btn btn-primary" onClick={startPlayList} disabled={videos.length === 0}>
            Iniciar
          </button>
        </div>
      </div>
      <div className="rowPlayListCards">
        {
          videos && videos.map(video =>
            <PlayListCard video={video} deleteVideo={deleteVideo}
              selectedVideo={currentVideo && currentVideo.id.videoId === video.id.videoId}
            />
          )
        }
      </div>
    </div>
  )
}

export default PlayList;
