import React from 'react';

import {Grid, TextField, } from '@material-ui/core';

import PrimaryButton from '../Utils/Buttons/PrimaryButton';

const SearchInput = ({search, inputSearch, searchVideos, handleKeypress, }) => {

  return(
    <div onKeyDown={handleKeypress}>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            name="description"
            label="Descripción"
            variant="outlined"
            value={search}
            onChange={inputSearch}
          />
        </Grid>
        <Grid item xs={4}>
          <PrimaryButton title={'Buscar'} onClick={searchVideos} />
        </Grid>
      </Grid>
    </div>
  )
}

export default SearchInput;
