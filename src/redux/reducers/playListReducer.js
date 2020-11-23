const initialState={
  playList: [],
  playListName: '',
  currentVideo: {
    id: {
      videoId: ''
    }
  },
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'addNewVideo':
      return {
        ...state,
        playList: [...state.playList, action.payload.video],
        playListName: action.payload.playListName
      }
    case 'changeVideo':
      return {
        ...state,
        currentVideo: action.payload.currentVideo
      }
    case 'deleteSong':
      return {
        ...state,
        playList: state.playList.filter(video => video.snippet.title !== action.payload.videoToDelete.snippet.title),
      }
    default:
      return state;
  }
}
