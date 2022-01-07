import React, {useEffect, useRef, } from 'react';

// import ReactPlayer from 'react-player';
// import YouTube from 'react-youtube';
// import SpotifyPlayer from 'react-spotify-web-playback';

// import { useDispatch, useSelector } from 'react-redux';
// import { createSelector } from 'reselect';
// import {handleNextSong, } from '../../../redux/actions';

import YouTubePlayer from './YouTubePlayer';
import SPlayer from './SpotifyPlayer';

// const PlayListSelector = createSelector(
//   state => state.playList,
//   playList => playList
// )

const VideoPlayer = ({socket, playListId, currentVideo, selectedVideo, }) => {

  const nextSong = () => {

    console.log('cambiando cancion', selectedVideo.songName);

    socket.current.emit('changeCurrentSongPlaylist', currentVideo.currentSongPosition + 1, playListId);

    // const songIndex = playList.findIndex(song => song.snippet.title === currentVideo.snippet.title);
    //
    // if (songIndex === -1) {
    //   dispatch(handleNextSong(playList[0]))
    // }
    // if (songIndex === playList.length-1) {
    //   dispatch(handleNextSong(playList[0]))
    // }
    // else {
    //   dispatch(handleNextSong(playList[songIndex+1]))
    // }
  }

  console.log(selectedVideo.provider);

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
      {/*
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
      */}
      {/*
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
      */}
      {
        {
          'youtube': <YouTubePlayer
            selectedVideo={selectedVideo}
            nextSong={nextSong}
          />,
          'spotify': <SPlayer
            selectedVideo={selectedVideo}
            nextSong={nextSong}
          />
        }[selectedVideo.provider]
      }
      {/*<div
        style={{width: '100%', height: '100%'}}
      >
        <div ref={videoRef} />
      </div>*/}

    </>
  )
}

export default VideoPlayer;
