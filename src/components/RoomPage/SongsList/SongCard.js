import React, {useState} from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid, TextField, Card, CardContent, CardMedia, IconButton, Typography, } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '15px 5px 5px 5px'
  },
  cover: {
    padding: 5
  },
}));

const SongCard = ({song, addVideoToPlayList, }) => {

  const theme = useTheme();
  const classes = useStyles();
  // let title = ''
  // if (video.snippet) {
  //   title = video.snippet.title.replace(/&#39;/g, "'")
  // }
  // else {
  //   console.log(video);
  // }
  // const title = video.snippet.title.replace(/&#39;/g, "'").replace(/&quot;/g,'"');
  const songImage = song.album?.images[1]?.url;

  const [showButtons, setShowButtons] = useState(false);

  const handleShowButtons = () => {
    setShowButtons(!showButtons)
  }

  return (
    <Card
      className={classes.root}
      onMouseEnter={handleShowButtons}
      onMouseLeave={handleShowButtons}
    >
      <Grid container>
        <Grid item xs={2}>
          <CardMedia
            className={classes.cover}
            title={song.name}
          >
            <img style={{width: "80%", height: '80%'}} src={songImage} />
          </CardMedia>
        </Grid>
        <Grid item xs={10}>
          <CardContent>
            <Typography variant="h6" className="limitText">
              {song.name}
            </Typography>
            <Grid container>
              <Grid item xs={showButtons ? 11 : 12}>
                {/*<div className="descriptionVideo">
                  {video.snippet.description}
                </div>*/}
              </Grid>
              {
                showButtons &&
                <Grid item xs={1}>
                  <IconButton onClick={() => addVideoToPlayList(song)}>
                    <ArrowForwardIcon/>
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

export default SongCard;
