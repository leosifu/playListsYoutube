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

const VideoCard = ({video, addVideoToPlayList, }) => {

  const theme = useTheme();
  const classes = useStyles();
  // let title = ''
  // if (video.snippet) {
  //   title = video.snippet.title.replace(/&#39;/g, "'")
  // }
  // else {
  //   console.log(video);
  // }
  const title = video.snippet.title.replace(/&#39;/g, "'").replace(/&quot;/g,'"');

  const [showButtons, setShowButtons] = useState(false);

  const handleShowButtons = () => {
    setShowButtons(!showButtons)
  }

  return (
    <>
    {/*<Card style={{width: "90%"}}
      onMouseEnter={handleShowButtons}
      onMouseLeave={handleShowButtons}
    >
      <Container>
        <Row className={'no-gutters'}>
          <Col md={4}>
            <Card.Img style={{width: "100%", height: '100%'}} src={video.snippet.thumbnails.medium.url} />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title >
                {title}
              </Card.Title>
            </Card.Body>
            <Card.Text>
              <Row>
                <Col xs={showButtons ? 10:12}>
                  <small className="text-muted descriptionVideo">
                    {video.snippet.description}
                  </small>
                </Col>
                {
                  showButtons &&
                  <Col xs={2}>
                    <Button onClick={() => addVideoToPlayList(video)}>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg>
                    </Button>
                  </Col>
                }
              </Row>
            </Card.Text>
          </Col>
        </Row>
      </Container>
    </Card>*/}
    <Card
      className={classes.root}
      onMouseEnter={handleShowButtons}
      onMouseLeave={handleShowButtons}
    >
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            className={classes.cover}
            title={title}
          >
            <img style={{width: "100%", height: '100%'}} src={video.snippet.thumbnails.medium.url} />
          </CardMedia>
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h6" className="limitText">
              {title}
            </Typography>
            <Grid container>
              <Grid item xs={showButtons ? 11 : 12}>
                <div className="descriptionVideo">
                  {video.snippet.description}
                </div>
              </Grid>
              {
                showButtons &&
                <Grid item xs={1}>
                  <IconButton onClick={() => addVideoToPlayList(
                    {
                      url: video.id.videoId,
                      songName: video.snippet.title,
                      image: video.snippet.thumbnails.medium.url
                    }
                  )}>
                    <ArrowForwardIcon/>
                  </IconButton>
                </Grid>
              }
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
    {/*<div className="card mb-3" style={{width: "90%"}}
      onMouseEnter={handleShowButtons}
      onMouseLeave={handleShowButtons}
    >
      <div className="row no-gutters">
        <div className="col-md-4">
          <img style={{width: "100%", height: '100%'}} src={video.snippet.thumbnails.medium.url} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h6 className="card-title">
              {title}
            </h6>
              <div className="row">
                <div className={showButtons ? "col-10" : "col-12"}>
                  <p className="card-text">
                    <small className="text-muted descriptionVideo">
                      {video.snippet.description}
                    </small>
                  </p>
                </div>
                {
                  showButtons  &&
                  <div className="col-2">
                    <Button onClick={() => addVideoToPlayList(video)}>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg>
                    </Button>
                  </div>
                }
              </div>
            </div>
        </div>
      </div>
    </div>*/}
    </>
  )
}

export default VideoCard;
