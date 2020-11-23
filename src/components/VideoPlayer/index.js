import React, {useState, useEffect} from 'react';

import ReactPlayer from 'react-player';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleNextSong, } from '../../redux/actions';

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

  return (
    <ReactPlayer
      playing
      height={'250px'}
      width={'100%'}
      onEnded={() => nextSong()}
      url={`https://www.youtube.com/watch?v=${currentVideo && currentVideo.id.videoId}`}
    />
  )
}

export default VideoPlayer;
