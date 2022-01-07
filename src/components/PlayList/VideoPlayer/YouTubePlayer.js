import React, {useEffect, useRef, } from 'react';

const YouTubePlayer = ({selectedVideo, nextSong, }) => {

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

  const playerStates = {
    0: nextSong
  }

  const onPlayerStateChange = (event) => {
    const stateFunction = playerStates[event.data];
    if (stateFunction) {
      stateFunction();
    }
  }

  return (
    <div
      style={{width: '100%', height: '100%'}}
    >
      <div ref={videoRef} />
    </div>
  )
}

export default YouTubePlayer;
