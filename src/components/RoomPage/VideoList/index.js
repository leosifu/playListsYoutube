import {useState, } from 'react';

import useInfiniteScroll from 'react-infinite-scroll-hook';

import {Paper, Typography, } from '@material-ui/core';

import VideoCard from './VideoCard';

import './videoList.css'

const VideoList = ({videos, addVideoToPlayList, loader, loading, nextPage, }) => {

  const [sentryRef] = useInfiniteScroll({
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
    <div style={{maxHeight: '80vh', overflow: 'auto'}}>
      <Typography variant="h5">
        Lista de videos
      </Typography>
      <Paper style={{padding: 5, height: '60%', overflowY: 'auto'}}>
        {
          videos && videos.map((video, i) =>
            <>
              {
                (i === videos.length - 2) ?
                <div ref={sentryRef}>
                  <VideoCard video={video} addVideoToPlayList={addVideoToPlayList}/>
                </div>
                :
                <VideoCard video={video} addVideoToPlayList={addVideoToPlayList}/>
              }
            </>
          )
        }
        {/*(true) && (
          <div ref={sentryRef}>
          hola
          </div>
        )*/}
      </Paper>
    </div>
  )
}

export default VideoList;
