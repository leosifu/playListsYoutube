import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Button, Card, CardContent, CardMedia, IconButton, Typography, } from '@material-ui/core';

import { useDispatch, } from 'react-redux';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: 150
  },
}));

const Room = ({room, }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const goRoom = () => {
    dispatch(push(`/room/${room._id}`));
  }

  return (
    <Card
      className={classes.root}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {room.songName}
        </Typography>
        <Button
          variant='outlined'
          onClick={goRoom}
        >
          Ir a sala
        </Button>
      </CardContent>
    </Card>
  )
}

export default Room;
