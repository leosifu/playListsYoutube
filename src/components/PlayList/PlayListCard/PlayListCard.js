import {useState} from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid, TextField, Card, CardContent, CardMedia, IconButton, Typography, } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';

import { useDispatch, } from 'react-redux';
import {handleNextSong, } from '../../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: 150
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const PlayListCard = ({video, deleteVideo, selectedVideo, }) => {

  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const title = video.snippet.title.replace(/&#39;/g, "'").replace(/&quot;/g,'"');

  const [showButtons, setShowButtons] = useState(false);

  const handleShowButtons = () => {
    setShowButtons(!showButtons)
  }

  const selectVideo = () => {
    dispatch(handleNextSong(video));
  }

  return (
    <Card
      onMouseEnter={handleShowButtons}
      onMouseLeave={handleShowButtons}
      onClick={selectVideo}
    >
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            className={classes.cover}
            image={video.snippet.thumbnails.medium.url}
            title={title}
          >
            <img style={{width: "100%", height: '100%'}} src={video.snippet.thumbnails.medium.url} />
          </CardMedia>
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Grid container>
              <Grid item xs={showButtons ? 10 : 12}>
                <Typography variant="h6" className="limitText">
                  {title}
                </Typography>
              </Grid>
              {
                showButtons &&
                <Grid item xs={2}>
                  <IconButton onClick={e => deleteVideo(e, video)}>
                    <ClearIcon/>
                  </IconButton>
                </Grid>
              }
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default PlayListCard;
