import {useState} from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid, Card, } from '@material-ui/core';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { CardTypes } from './CardTypes';

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

const PlayListCard = ({id, index, socket, playListId, position, video, deleteVideo, selectedVideo, movePlayListCard, saveMovePlaylistCard, }) => {

  const classes = useStyles();
  const ref = useRef(null);

  const [showButtons, setShowButtons] = useState(false);

  const handleShowButtons = (status) => {
    setShowButtons(status);
  }

  const selectVideo = () => {
    socket.current.emit('changeCurrentSongPlaylist', position, playListId);
  }

  const [{ handlerId }, drop] = useDrop({
    accept: CardTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
          return;
      }
      // console.log(position);
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
          return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      movePlayListCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: CardTypes.CARD,
    item: () => {
      return { id, index, position };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      console.log(item);
      if (item.index !== item.position) {
        saveMovePlaylistCard(item.id, item.index, item.position);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Card
      onMouseEnter={e => handleShowButtons(true)}
      onMouseLeave={e => handleShowButtons(false)}
      onClick={selectVideo}
      ref={ref}
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
