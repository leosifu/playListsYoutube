import React, {useState, useEffect, useRef, } from 'react';

import axios from 'axios';
import ReactPlayer from 'react-player';
// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component';

import {Button, } from 'react-bootstrap';

import youtubeApiCall from '../../config/youtubeApiCall';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handlePlayList, } from '../../redux/actions';

import PlayList from '../../containers/PlayList/PlayListContainer';
import SearchInput from './SearchInput';
import SearchPaginator from './SearchPaginator';
import VideoList from './VideoList';
import VideoPlayer from '../VideoPlayer';

import './MainPage.css';

const MainPage = () => {

  const dispatch = useDispatch();

  const loader = useRef(null);

  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [playListVideos, setPlayListVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [nextPageToken, setNextPageToken] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const searchVideos = async() => {
    // axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}
    //   &part=snippet
    //   &q=${search}
    //   &type=video
    //   &maxResults=8`)
    const params = `&part=snippet&maxResults=5&q=${search}&type=video`
    const result = await youtubeApiCall('search', params);
    setNextPageToken(result.nextPageToken);
    setVideos(result.items);
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

  const nextPage = async() => {
    const params = `&part=snippet&maxResults=5&q=${search}&pageToken=${nextPageToken}&type=video`
    const result = await youtubeApiCall('search', params);
    setVideos([...videos, ...result.items]);
    setNextPageToken(result.nextPageToken);
    // console.log('siguiente...');
  }

  const handleKeypress = async (e) => {
    if (e.keyCode === 13) {
      await searchVideos();
    }
  };

  const inputSearch = (event) => {
    setSearch(event.target.value)
  }

  const addVideoToPlayList = (video) => {
    setCurrentVideo(video.id.videoId)
    dispatch(handlePlayList('add', video))
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-7">
          <SearchInput search={search} inputSearch={inputSearch} searchVideos={searchVideos}
            handleKeypress={handleKeypress} loader={loader}/>
            <div
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
          </div>
        </div>
        <div className="col-5">
          <PlayList videos={playListVideos} />
          <VideoPlayer />
        </div>
      </div>
    </div>
  )
}

export default MainPage;
