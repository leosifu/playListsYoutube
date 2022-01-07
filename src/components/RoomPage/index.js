import React, {useState, useEffect, useRef, } from 'react';

import { useParams } from "react-router-dom";

import io from "socket.io-client";
import clientAxios from '../../config/axios';
import ReactPlayer from 'react-player';
// import InfiniteScroll from 'react-infinite-scroller';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import useInfiniteScroll from 'react-infinite-scroll-hook';

import {Button, Grid, } from '@material-ui/core';

import youtubeApiCall from '../../config/youtubeApiCall';
import {spotifySearch, } from '../../config/spotifyApiCall';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handlePlayList, } from '../../redux/actions';

import PlayList from '../../containers/PlayList/PlayListContainer';
import SearchInput from './SearchInput';
import SearchPaginator from './SearchPaginator';
import VideoList from './VideoList';
import SongsList from './SongsList';
// import VideoPlayer from '../VideoPlayer';
// import socket from '../Utils/Socket';

import './MainPage.css';

const RoomPage = () => {

  const dispatch = useDispatch();

  const { id } = useParams();
  const loader = useRef(null);

  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [playListVideos, setPlayListVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({
    currentSongPosition: 0,
    currentSongMinute: '0:00',
  });
  const [nextPageToken, setNextPageToken] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [firstSearch, setFirstSearch] = useState(false);
  const [provider, setProvider] = useState('youtube');
  const [type, setType] = useState(false);
  const [songs, setSongs] = useState(false);
  const socket = useRef();

  useEffect(() => {
    getPlayList();
    socket.current = io('http://localhost:8000');
    socket.current.on('connnection', () => {
      console.log('connected to server');
    })


    socket.current.on('playList-updated', (playList) => {
      console.log(playList);
      setPlayListVideos(playList.songs);
      setCurrentVideo({
        currentSongMinute: playList.currentSongMinute,
        currentSongPosition: playList.currentSongPosition
      });
    })

    socket.current.on('disconnect', () => {
      console.log('Socket disconnecting');
      socket.current.disconnect();
    });

    return () => socket.current.disconnect();
  }, []);

  // useEffect(() => {
  //   const socket = io('http://localhost:8000');
  //   console.log(socket);
  //
  //   socket.on('connnection', () => {
  //     console.log('connected to server');
  //   })
  //
  //   // socket.emit('newSong', )
  //
  //   socket.on('playList-updated', (playList) => {
  //     console.log(playList);
  //     setPlayListVideos(playList.songs);
  //   })
  //
  //   socket.on('disconnect', () => {
  //     console.log('Socket disconnecting');
  //     socket.disconnect();
  //   });
  //
  //   return () => socket.disconnect();
  //
  // }, []);

  const getPlayList = async () => {
    try {
      const {data} = await clientAxios().get(`/api/playList/${id}`);
      setPlayListVideos(data.songs);
      setCurrentVideo({
        currentSongMinute: data.currentSongMinute,
        currentSongPosition: data.currentSongPosition
      });
    } catch (e) {
      console.log(e);
    }
  }

  // type false === youtube, type true === spotify
  const handleChangeType = () => setType(type => !type);
  const handleChangeProvider = (e, newProvider) => setProvider(provider => newProvider);

  const searchVideos = async() => {
    // axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}
    //   &part=snippet
    //   &q=${search}
    //   &type=video
    //   &maxResults=8`)
    if (search) {
      const params = `&part=snippet&maxResults=5&q=${search}&type=video`
      const result = await youtubeApiCall('search', params);
      setNextPageToken(result.nextPageToken);
      setVideos(result.items);
      setFirstSearch(true);
    }
    // axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20
    // &q=${search}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
    // .then(res => {
    //   console.log(res.data);
    //   setVideos(res.data);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }

  const searchSpotify = async () => {
    if (search) {
      const params = `q=${search}&type=track`;
      const result = await spotifySearch(params);
      console.log(result?.tracks?.items);
      setSongs(result?.tracks?.items || []);
    }
  }

  const nextPage = async() => {
    if (search && firstSearch) {
      switch (provider) {
        case 'youtube':
          setLoading(true);
          const params = `&part=snippet&maxResults=5&q=${search}&pageToken=${nextPageToken}&type=video`
          const result = await youtubeApiCall('search', params);
          setVideos([...videos, ...result.items]);
          setNextPageToken(result.nextPageToken);
          setLoading(false);
          break;
        case 'spotify':

          break;
        default:
          console.log('aiuraaa');
      }

    }
    // console.log('siguiente...');
  }

  const handleKeypress = async (e) => {
    if (e.keyCode === 13) {
      switch (provider) {
        case 'youtube':
          await searchVideos();
          break;
        case 'spotify':
          await searchSpotify();
          break;
        default:
          console.log('que ha pasado');
      }
    }
  };

  const inputSearch = (event) => {
    setSearch(event.target.value);
  }

  const addVideoToPlayList = async (video) => {
    // console.log(video);
    try {
      socket.current.emit('saveSongToPlaylist', {...video, provider}, id);
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <Grid container >
      <Grid item xs={7}>
        <SearchInput search={search} inputSearch={inputSearch} searchVideos={searchVideos}
          handleKeypress={handleKeypress} loader={loader} type={type} handleChangeType={handleChangeType}
          provider={provider} handleChangeProvider={handleChangeProvider} searchSpotify={searchSpotify}
        />
        {
          {
            'youtube': <VideoList videos={videos} addVideoToPlayList={addVideoToPlayList} nextPage={nextPage}/>,
            'spotify': <SongsList songs={songs} addVideoToPlayList={addVideoToPlayList} loading={loading} nextPage={nextPage} />
          }[provider]
        }
        {/*<div
          id="scrollableDiv"
          style={{
            height: 600,
            overflow: 'auto',
            display: 'flex',
          }}
        >
        <div>
          <InfiniteScroll
            dataLength={videos.length}
            next={() => nextPage()}
            style={{ display: 'flex'}}
            hasMore={true}
            scrollableTarget="scrollableDiv"
          >
            <VideoList videos={videos} addVideoToPlayList={addVideoToPlayList} />
          </InfiniteScroll>
        </div>
      </div>*/}
      </Grid>
      <Grid item xs={5}>
        <PlayList
          socket={socket}
          playListId={id}
          videos={playListVideos}
          setVideos={setPlayListVideos}
          currentVideo={currentVideo}
          setCurrentVideo={setCurrentVideo}
        />
        {/*<VideoPlayer />*/}
      </Grid>
    </Grid>
  )
}

export default RoomPage;
