import { makeStyles, } from '@material-ui/core/styles';

import {Grid, CardContent, CardMedia, IconButton, Typography, } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: 150
  },
}));

const CardDetailsYoutube = ({song, deleteVideo, showButtons, }) => {

  const classes = useStyles();

  const songImage = song.album?.images[1]?.url;

  return (
    <>
      <Grid item xs={4}>
        <CardMedia
          className={classes.cover}
          title={song.name}
        >
          <img alt={song.name} style={{width: "60%"}} src={songImage} />
        </CardMedia>
      </Grid>
      <Grid item xs={8}>
        <CardContent>
          <Grid container>
            <Grid item xs={showButtons ? 10 : 12}>
              <Typography variant="h6" className="limitText">
                {song.name}
              </Typography>
            </Grid>
            {
              showButtons &&
              <Grid item xs={2}>
                <IconButton onClick={e => deleteVideo(e, song)}>
                  <ClearIcon/>
                </IconButton>
              </Grid>
            }
          </Grid>
        </CardContent>
      </Grid>
    </>
  )
}

export default CardDetailsYoutube;
