import React, {useState} from 'react';

import { useDispatch, } from 'react-redux';
import {handleNextSong, } from '../../redux/actions';

const PlayListCard = ({video, deleteVideo, selectedVideo, }) => {

  const dispatch = useDispatch();

  const title = video.snippet.title.replace(/&#39;/g, "'");

  const [showButtons, setShowButtons] = useState(false);

  const handleShowButtons = () => {
    setShowButtons(!showButtons)
  }

  const selectVideo = () => {
    dispatch(handleNextSong(video));
  }

  return (
    <div className={`card mb-3 playListCard ${selectedVideo && "playListSelectedVideo"}`}
      onMouseEnter={handleShowButtons}
      onMouseLeave={handleShowButtons}
      onClick={selectVideo}
    >
      <div className="row no-gutters">
        <div className="col-md-4">
          <img style={{width: "100%", height: '100%'}} src={video.snippet.thumbnails.medium.url} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="row">
              <div className={showButtons ? "col-10" : "col-12"}>
                <h6 className="card-title limitText">
                  {title}
                </h6>
              </div>
              {
                showButtons  &&
                <div className="col-2">
                  <button onClick={e => deleteVideo(e, video)}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayListCard;
