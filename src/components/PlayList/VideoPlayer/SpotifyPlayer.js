import {useState, useEffect, useRef, } from 'react';

import SpotifyPlayer from 'react-spotify-web-playback';

const SPlayer = ({selectedVideo, nextSong, }) => {
  console.log('asd');

  const userSpotifyToken = localStorage.getItem('spotifyToken');

  // const [player, setPlayer] = useState(undefined);
  //
  // const playerSpotify = useRef();
  //
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://sdk.scdn.co/spotify-player.js";
  //   script.async = true;
  //
  //   document.body.appendChild(script);
  //
  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //
  //     playerSpotify.current = new window.Spotify.Player({
  //       name: 'Web Playback SDK',
  //       getOAuthToken: cb => { cb(userSpotifyToken); },
  //       volume: 0.5
  //     });
  //
  //     // setPlayer(player);
  //
  //     playerSpotify.current.addListener('ready', ({ device_id }) => {
  //       console.log('Ready with Device ID', device_id);
  //     });
  //
  //     playerSpotify.current.addListener('not_ready', ({ device_id }) => {
  //       console.log('Device ID has gone offline', device_id);
  //     });
  //
  //
  //     playerSpotify.current.connect();
  //
  //   };
  //
  // }, [selectedVideo]);

  const algo = (state) => {
    console.log(state);
    if (state.previousTracks.length > 0 && state.status !== "INITIALIZING") {
      console.log('noooo');
      nextSong();
    }
  }

  return (
    <>
      {/*<div className="container" ref={playerSpotify}>
        <div className="main-wrapper">

        </div>
      </div>*/}
      <SpotifyPlayer
        autoPlay={true}
        initialVolume={0.4}
        callback={algo}
        token={userSpotifyToken}
        uris={[selectedVideo.url]}
      />
      {/*<iframe
        title="Spotify"
        className="SpotifyPlayer"
        src={`https://embed.spotify.com/?uri=${selectedVideo.url}`}
        frameBorder="0"
        allowtransparency="true"
      />*/}
    </>
  )
}

export default SPlayer;
