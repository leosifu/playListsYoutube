import React from 'react';

import {Button, Grid, Paper, } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleNextSong, handleDeleteSong, } from '../../redux/actions';

import PlayListCard from './PlayListCard/PlayListCard';
import VideoPlayer from './VideoPlayer';

import PrimaryButton from '../Utils/Buttons/PrimaryButton';

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
    <Paper style={{maxHeight: '80vh', padding: 10}}>
      <div className="vertical-scrollable">
        <Grid container>
          <Grid item xs={4}>
            Mi Playlist
          </Grid>
          <Grid item xs={8}>
            <PrimaryButton title={'Iniciar'} onClick={startPlayList} disabled={videos.length === 0} />
          </Grid>
        </Grid>
        <div className="rowPlayListCards">
          {
            videos && videos.map(video =>
              <div style={{padding: 10}}>
                <PlayListCard video={video} deleteVideo={deleteVideo}
                  selectedVideo={currentVideo && currentVideo.id.videoId === video.id.videoId}
                />
              </div>
            )
          }
        </div>
      </div>
      <div style={{textAlign: 'center', marginTop: 20}}>
        <VideoPlayer />
      </div>
    </Paper>
  )
}

export default PlayList;
