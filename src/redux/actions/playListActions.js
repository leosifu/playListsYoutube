export const handlePlayList = (type, video) => {
  if (type === 'add') {
    return dispatch => dispatch(addNewVideo(video))
  }
}

const addNewVideo = (video) => ({
  type: 'addNewVideo',
  payload: {
    video: video
  }
})

export const handleNextSong = (video) => {

  return dispatch=> dispatch(changeVideo(video));

}

const changeVideo = (video) => ({
  type: 'changeVideo',
  payload: {
    currentVideo: video
  }
})

export const handleDeleteSong = (video) => {
  return dispatch => dispatch(deleteSong(video))
}

const deleteSong = (video) => ({
  type: 'deleteSong',
  payload: {
    videoToDelete: video
  }
})
