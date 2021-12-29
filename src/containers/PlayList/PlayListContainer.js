import React from 'react';

import PlayList from '../../components/PlayList';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const PlayListSelector = createSelector(
  state => state.playList,
  playList => playList
)

const PlayListContainer = ({socket, playListId, videos, setVideos, currentVideo, setCurrentVideo, }) => {

  const playList = useSelector(PlayListSelector);

  return(
    <PlayList socket={socket} playListId={playListId} videos={videos} setVideos={setVideos} currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
  )
}

export default PlayListContainer;
