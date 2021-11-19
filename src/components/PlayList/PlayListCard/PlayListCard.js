import {useState} from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid, TextField, Card, CardContent, CardMedia, IconButton, Typography, } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';

import { useDispatch, } from 'react-redux';
import {handleNextSong, } from '../../../redux/actions';

import CardDetailsYoutube from './CardDetailsYoutube';
import CardDetailsSpotify from './CardDetailsSpotify';

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

  const [showButtons, setShowButtons] = useState(false);

  const handleShowButtons = (status) => {
    setShowButtons(status);
  }

  const selectVideo = () => {
    dispatch(handleNextSong(video));
  }

  return (
    <Card
      onMouseEnter={e => handleShowButtons(true)}
      onMouseLeave={e => handleShowButtons(false)}
      onClick={selectVideo}
    >
      <Grid container>
        {
          {
            'youtube': <CardDetailsYoutube video={video} deleteVideo={deleteVideo} showButtons={showButtons} />,
            'spotify': <CardDetailsSpotify song={video} deleteVideo={deleteVideo} showButtons={showButtons} />
          }[video.provider]
        }
      </Grid>
    </Card>
  )
}

export default PlayListCard;
