import React, {useEffect, useRef, } from 'react';

// import ReactPlayer from 'react-player';
// import YouTube from 'react-youtube';
import SpotifyPlayer from 'react-spotify-web-playback';

// import { useDispatch, useSelector } from 'react-redux';
// import { createSelector } from 'reselect';
// import {handleNextSong, } from '../../../redux/actions';

// const PlayListSelector = createSelector(
//   state => state.playList,
//   playList => playList
// )

const VideoPlayer = ({socket, playListId, currentVideo, selectedVideo, }) => {

  const videoRef = useRef();

  useEffect(() => {
    if (!window.YT || !window.YT.Player) {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      tag.onload = onYouTubeIframeAPIReady;
    }
    else {
      onYouTubeIframeAPIReady(selectedVideo.url);
    }
  }, [selectedVideo]);

  const onYouTubeIframeAPIReady = (url) => {
    new window.YT.Player(videoRef.current, {
      height: '100%',
      width: '100%',
      videoId: selectedVideo && selectedVideo.url,
      playerVars: {
        autoplay: 1,
      },
      events: {
        // 'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  const nextSong = () => {

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

  const playerStates = {
    0: nextSong
  }

  const onPlayerStateChange = (event) => {
    const stateFunction = playerStates[event.data];
    if (stateFunction) {
      stateFunction();
    }
  }

  const userSpotifyToken = localStorage.getItem('spotifyToken');

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
          'youtube': <div
            style={{width: '100%', height: '100%'}}
          >
            <div ref={videoRef} />
          </div>,
          'spotify': <SpotifyPlayer
            token={userSpotifyToken}
            uris={[currentVideo && currentVideo.uri]}
          />
        }[selectedVideo.provider]
      }

      {/*<iframe

        // src={`https://www.youtube.com/watch?v=${selectedVideo && selectedVideo.url}`}
        src={`https://www.youtube.com/embed/${selectedVideo && selectedVideo.url}`}
      />*/}

    </>
  )
}

export default VideoPlayer;
