import React, {useState, useEffect, useRef, } from 'react';

import axios from 'axios';
import ReactPlayer from 'react-player';
// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import {Button, Grid, } from '@material-ui/core';

import youtubeApiCall from '../../config/youtubeApiCall';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handlePlayList, } from '../../redux/actions';

import PlayList from '../../containers/PlayList/PlayListContainer';
import SearchInput from './SearchInput';
import SearchPaginator from './SearchPaginator';
import VideoList from './VideoList';
// import VideoPlayer from '../VideoPlayer';

import './MainPage.css';

const MainPage = () => {

  const dispatch = useDispatch();

  const loader = useRef(null);

  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [playListVideos, setPlayListVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [nextPageToken, setNextPageToken] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [firstSearch, setFirstSearch] = useState(false);

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

  const nextPage = async() => {
    if (search && firstSearch) {
      setLoading(true);
      const params = `&part=snippet&maxResults=5&q=${search}&pageToken=${nextPageToken}&type=video`
      const result = await youtubeApiCall('search', params);
      setVideos([...videos, ...result.items]);
      setNextPageToken(result.nextPageToken);
      setLoading(false);

    }
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

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage: true,
    onLoadMore: nextPage,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    // disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    // rootMargin: '0px 0px 400px 0px',
  });

  return(
    <Grid container >
      <Grid item xs={7}>
        <SearchInput search={search} inputSearch={inputSearch} searchVideos={searchVideos}
          handleKeypress={handleKeypress} loader={loader}/>
        <VideoList videos={videos} addVideoToPlayList={addVideoToPlayList} nextPage={nextPage}/>
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
        <PlayList videos={playListVideos} />
        {/*<VideoPlayer />*/}
      </Grid>
    </Grid>
  )
}

export default MainPage;
