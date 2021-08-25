import React, {useState, useEffect} from 'react';

import ReactPlayer from 'react-player';
import YouTube from 'react-youtube';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleNextSong, } from '../../../redux/actions';

const PlayListSelector = createSelector(
  state => state.playList,
  playList => playList
)

const VideoPlayer = () => {

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

  const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

  return (
    <>
      <YouTube
        videoId={currentVideo.id.videoId}
        id={currentVideo.id.videoId}
        // className={string}
        // containerClassName={string}
        opts={opts}
        // onReady={func}
        // onPlay={func}
        // onPause={func}
        onEnd={nextSong}
        // onError={func}
        // onStateChange={func}
        // onPlaybackRateChange={func}
        // onPlaybackQualityChange={func}
      />
      {/*<ReactPlayer
        playing
        height={'250px'}
        width={'100%'}
        onEnded={() => nextSong()}
        url={`https://www.youtube.com/watch?v=${currentVideo && currentVideo.id.videoId}`}
      />*/}
    </>
  )
}

export default VideoPlayer;
