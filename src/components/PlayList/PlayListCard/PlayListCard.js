import {useState} from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid, Card, } from '@material-ui/core';

// import ClearIcon from '@material-ui/icons/Clear';

// import { useDispatch, } from 'react-redux';
// import {handleNextSong, } from '../../../redux/actions';

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

const PlayListCard = ({socket, playListId, position, video, deleteVideo, selectedVideo, }) => {

  const classes = useStyles();

  const [showButtons, setShowButtons] = useState(false);

  const handleShowButtons = (status) => {
    setShowButtons(status);
  }

  const selectVideo = () => {
    socket.current.emit('changeCurrentSongPlaylist', position, playListId);
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
