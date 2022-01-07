import {useState, useEffect, } from 'react';

import SpotifyPlayer from 'react-spotify-web-playback';

const SPlayer = ({selectedVideo, nextSong, }) => {
  console.log('asd');

  const userSpotifyToken = localStorage.getItem('spotifyToken');

  // const [player, setPlayer] = useState(undefined);
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
  //     const player = new window.Spotify.Player({
  //       name: 'Web Playback SDK',
  //       getOAuthToken: cb => { cb(userSpotifyToken); },
  //       volume: 0.5
  //     });
  //
  //     setPlayer(player);
  //
  //     player.addListener('ready', ({ device_id }) => {
  //       console.log('Ready with Device ID', device_id);
  //     });
  //
  //     player.addListener('not_ready', ({ device_id }) => {
  //       console.log('Device ID has gone offline', device_id);
  //     });
  //
  //
  //     player.connect();
  //
  //   };
  //
  // }, []);

  const algo = (state) => {
    console.log(state);
    if (state.previousTracks.length > 0 && state.status !== "INITIALIZING") {
      console.log('noooo');
      nextSong();
    }
  }

  return (
    <>
      {/*<div className="container">
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
