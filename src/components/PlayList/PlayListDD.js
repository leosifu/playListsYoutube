import {useState, useEffect, useCallback, } from 'react';

import PlayListCard from './PlayListCard/PlayListCard';

const PlayListDD = ({videos, socket, playListId, deleteVideo, selectedVideo, }) => {

  const [playListVideos, setPlayListVideos] = useState([]);

  useEffect(() => {
    setPlayListVideos(videos);
    console.log(videos);
  }, [videos]);

  useEffect(() => {
    console.log(playListVideos);
  }, [playListVideos]);

  const movePlayListCard = useCallback((dragIndex, hoverIndex) => {
    // console.log(dragIndex);
    // console.log(hoverIndex);
    setPlayListVideos(playListVideos => {
      const playListVideosCopy = [...playListVideos];
      playListVideosCopy.splice(hoverIndex, 0, playListVideosCopy.splice(dragIndex, 1)[0]);
      return playListVideosCopy;
    });
  }, [videos]);

  const saveMovePlaylistCard = (id, toIndex, currentIndex) => {
    socket.current.emit('moveSongInPlaylist', id, playListId, toIndex, currentIndex);
  }

  return (
    <>
      {
        playListVideos && playListVideos.map((video, i) =>
          <div style={{padding: 10}}>
            <PlayListCard
              id={video._id}
              index={i}
              socket={socket}
              playListId={playListId}
              position={i}
              video={video}
              deleteVideo={deleteVideo}
              selectedVideo={selectedVideo && selectedVideo}
              movePlayListCard={movePlayListCard}
              saveMovePlaylistCard={saveMovePlaylistCard}
            />
          </div>
        )
      }
    </>
  )
}

export default PlayListDD;
