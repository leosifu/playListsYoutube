import React from 'react';

import { makeStyles, } from '@material-ui/core/styles';
import {Grid, TextField, Button, IconButton, } from '@material-ui/core';

import { Icon } from '@iconify/react';

import PrimaryButton from '../Utils/Buttons/PrimaryButton';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttons: {
    marginLeft: '5px',
    marginRight: '5px'
  }
}));

const SearchInput = ({search, inputSearch, searchVideos, handleKeypress, type, handleChangeType, provider, handleChangeProvider,
  searchSpotify, }) => {

  const classes = useStyles();

  return(
    <div onKeyDown={handleKeypress}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="description"
            label="Descripción"
            variant="outlined"
            value={search}
            onChange={inputSearch}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <PrimaryButton title={'Buscar'} onClick={provider === 'youtube' ? searchVideos : searchSpotify} />
            <IconButton
              onClick={e => handleChangeProvider(e, provider === 'youtube' ? 'spotify' : 'youtube')}
            >
              {
                provider === 'youtube' ?
                <Icon icon="logos:youtube-icon" />
                :
                <Icon icon="cib:spotify" />
              }
            </IconButton>
            <Button
              variant='outlined'
              onClick={handleChangeType}
            >
              {type ? 'Video' : 'PlayList'}
            </Button>
            {/*<Button
              variant='outlined'
            >
              <img style={{width: "10%", height: '10%'}} src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-5-2.png" />
            </Button>*/}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default SearchInput;
