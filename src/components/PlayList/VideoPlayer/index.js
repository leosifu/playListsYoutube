import React, {useState, useEffect} from 'react';

import ReactPlayer from 'react-player';
import YouTube from 'react-youtube';
import SpotifyPlayer from 'react-spotify-web-playback';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleNextSong, } from '../../../redux/actions';

const PlayListSelector = createSelector(
  state => state.playList,
  playList => playList
)

const VideoPlayer = ({selectedVideo, }) => {

  const dispatch = useDispatch();

  const playListData = useSelector(PlayListSelector);
  const playList = playListData.playList;
  const currentVideo = playListData.currentVideo;

  useEffect(() => {
    if (playList.length === 1 && !currentVideo) {
      dispatch(handleNextSong(playList[0]))
    }
  }, [playList])

  const nextSong = () => {

    const songIndex = playList.findIndex(song => song.snippet.title === currentVideo.snippet.title);

    if (songIndex === -1) {
      dispatch(handleNextSong(playList[0]))
    }
    if (songIndex === playList.length-1) {
      dispatch(handleNextSong(playList[0]))
    }
    else {
      dispatch(handleNextSong(playList[songIndex+1]))
    }
  }

  // const opts = {
  //     height: '390',
  //     width: '640',
  //     playerVars: {
  //       // https://developers.google.com/youtube/player_parameters
  //       autoplay: 1,
  //     },
  //   };

  const userSpotifyToken = localStorage.getItem('spotifyToken');
  console.log(selectedVideo);

  const changeSecondVideo = (e) => {
    console.log(e);
  }

  return (
    <>
      {/*<YouTube
        videoId={currentVideo.id.videoId}
        id={currentVideo.id.videoId}
        // className={string}
        // containerClassName={string}
        opts={
          {
            ...opts,
            height: 'auto',

          }
        }
        // onReady={func}
        // onPlay={func}
        // onPause={func}
        onEnd={nextSong}
        // onError={func}
        // onStateChange={func}
        // onPlaybackRateChange={func}
        // onPlaybackQualityChange={func}
      />*/}
      {
        {
          'youtube': <ReactPlayer
            playing
            controls
            onProgress={changeSecondVideo}
            height={'100%'}
            width={'100%'}
            onEnded={() => nextSong()}
            url={`https://www.youtube.com/watch?v=${selectedVideo && selectedVideo.url}`}
          />,
          'spotify': <SpotifyPlayer
            token={userSpotifyToken}
            uris={[currentVideo && currentVideo.uri]}
          />
        }[selectedVideo.provider]
      }

    </>
  )
}

export default VideoPlayer;
