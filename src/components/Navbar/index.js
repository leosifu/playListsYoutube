import {useState, } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import { Icon } from '@iconify/react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
];

const Navbar = () => {

  const classes = useStyles();

  const {
    REACT_APP_SPOTIFY_ID,
    REACT_APP_REDIRECT_URL
  } = process.env;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goLoginSpotify = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_SPOTIFY_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=code&show_dialog=true&scope=${scopes.join(' ')}`;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Photos
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={goLoginSpotify}>
            <Icon icon="mdi:spotify" />
            Login Spotify
            </MenuItem>
          <MenuItem onClick={handleClose}>
            <Icon icon="akar-icons:youtube-fill" />
            Login Youtube
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
