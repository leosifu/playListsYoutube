import React from 'react';

import PlayList from '../../components/PlayList';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const PlayListSelector = createSelector(
  state => state.playList,
  playList => playList
)

const PlayListContainer = () => {

  const playList = useSelector(PlayListSelector);

  return(
    <PlayList videos={playList.playList} currentVideo={playList.currentVideo}/>
  )
}

export default PlayListContainer;
