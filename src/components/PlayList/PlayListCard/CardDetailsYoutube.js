import { makeStyles, } from '@material-ui/core/styles';

import {Grid, CardContent, CardMedia, IconButton, Typography, } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: 150
  },
}));

const CardDetailsYoutube = ({video, deleteVideo, showButtons, }) => {

  const title = video.songName.replace(/&#39;/g, "'").replace(/&quot;/g,'"');

  const classes = useStyles();

  return (
    <>
      <Grid item xs={4}>
        <CardMedia
          className={classes.cover}
          image={video.image}
          title={title}
        >
          <img style={{width: "100%", height: '100%'}} src={video.image} />
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
    </>
  )
}

export default CardDetailsYoutube;
