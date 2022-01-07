import {useState, useEffect, } from 'react';

import {Grid, Paper, } from '@material-ui/core';

// import { useDispatch, useSelector } from 'react-redux';
// import { createSelector } from 'reselect';
// import {handleNextSong, handleDeleteSong, } from '../../redux/actions';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import PlayListCard from './PlayListCard/PlayListCard';
import VideoPlayer from './VideoPlayer';

import PrimaryButton from '../Utils/Buttons/PrimaryButton';

import './PlayList.css';

const PlayList = ({socket, playListId, videos, setVideos, currentVideo, }) => {

  // const dispatch = useDispatch();

  const [selectedVideo, setSelectedVideo] = useState({});

  useEffect(() => {
    const findVideo = videos[currentVideo.currentSongPosition];
    console.log(findVideo);
    setSelectedVideo(findVideo);
  }, [currentVideo.currentSongPosition, videos]);

  const startPlayList = () => {
    const findVideo = videos[currentVideo.currentSongPosition];
    setSelectedVideo(findVideo);
  }

  const deleteVideo = (event, video) => {
    event.stopPropagation();
    socket.current.emit('deleteSongFromPlayList', video._id, playListId);
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
          <VideoPlayer
            key={selectedVideo.url}
            socket={socket}
            playListId={playListId}
            currentVideo={currentVideo}
            selectedVideo={selectedVideo && selectedVideo}
          />
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
          <DndProvider backend={HTML5Backend}>
            {
              videos && videos.map((video, i) =>
                <div style={{padding: 10}}>
                  <PlayListCard
                    socket={socket}
                    playListId={playListId}
                    position={i}
                    video={video}
                    deleteVideo={deleteVideo}
                    selectedVideo={selectedVideo && selectedVideo}
                  />
                </div>
              )
            }
          </DndProvider>
        </div>
      </div>
    </Paper>
  )
}

export default PlayList;
