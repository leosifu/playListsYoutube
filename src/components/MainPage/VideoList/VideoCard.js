import React, {useState} from 'react';

import {Container, Button, Row, Col, Card, } from 'react-bootstrap';

const VideoCard = ({video, addVideoToPlayList, }) => {

  // let title = ''
  // if (video.snippet) {
  //   title = video.snippet.title.replace(/&#39;/g, "'")
  // }
  // else {
  //   console.log(video);
  // }
  const title = video.snippet.title.replace(/&#39;/g, "'");

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
    <div className="card mb-3" style={{width: "90%"}}
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
    </div>
    </>
  )
}

export default VideoCard;
