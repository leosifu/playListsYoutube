import {useState, useEffect, } from 'react';

import {Button, Grid, Paper, } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleNextSong, handleDeleteSong, } from '../../redux/actions';

import PlayListCard from './PlayListCard/PlayListCard';
import VideoPlayer from './VideoPlayer';

import PrimaryButton from '../Utils/Buttons/PrimaryButton';

import './PlayList.css';

const PlayList = ({videos, setVideos, currentVideo, }) => {

  const dispatch = useDispatch();

  const [selectedVideo, setSelectedVideo] = useState({});

  useEffect(() => {
    const findVideo = videos[currentVideo.currentSongPosition];
    console.log(findVideo);
    setSelectedVideo(findVideo);
  }, [currentVideo.currentSongPosition]);

  const startPlayList = () => {
    if (videos.length > 0) {
      dispatch(handleNextSong(videos[0]));
    }
  }

  const deleteVideo = (event, video) => {
    // event.stopPropagation();
    // if (currentVideo.id.videoId === video.id.videoId) {
    //   //Si es la cancion que esta reproduciendose se cambia a la siguiente
    //   const videoToDeleteIndex = videos.findIndex(song => song.id.videoId === video.id.videoId);
    //   dispatch(handleNextSong(videos[videoToDeleteIndex+1]));
    // }
    // dispatch(handleDeleteSong(video));
  }

  return(
    <Paper style={{height: '90vh', padding: 10}}>
      <div style={{textAlign: 'center', marginTop: 20, height: '35vh'}}>
        {
          selectedVideo &&
          <VideoPlayer selectedVideo={selectedVideo && selectedVideo} currentVideo={currentVideo} />
        }
      </div>
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
                  selectedVideo={selectedVideo && selectedVideo}
                />
              </div>
            )
          }
        </div>
      </div>
    </Paper>
  )
}

export default PlayList;
