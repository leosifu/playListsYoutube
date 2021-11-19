import axios from 'axios';
import querystring from 'querystring';
import clientAxios from './axios';

const apiType = {
  track: 'track',
  artist: 'artist'
}

const SPOTIFY_ACCOUNT = 'https://accounts.spotify.com/api/';
const SPOTIFY_API = 'https://api.spotify.com/v1/';

export const spotifySearch = async (params) => {
  try {
    const spotifyToken = localStorage.getItem('spotifyToken');
    const res = await clientAxios(spotifyToken).get(`${SPOTIFY_API}search?${params}`);
    console.log(res.data);
    return res.data;
  } catch (e) {

  }
}

export const spotifyLogin = async (token) => {
  try {
    console.log(token);

    const {
      REACT_APP_SPOTIFY_ID,
      REACT_APP_REDIRECT_URL,
      REACT_APP_SPOTIFY_SECRET
    } = process.env;

    const authorizationData = {
      grant_type: "authorization_code",
      redirect_uri: REACT_APP_REDIRECT_URL,
      code: token,
      client_id: REACT_APP_SPOTIFY_ID,
      client_secret: REACT_APP_SPOTIFY_SECRET
    }
    const {data} = await axios.post(`https://accounts.spotify.com/api/token`, querystring.stringify(authorizationData), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    console.log(data);
    localStorage.setItem('spotifyToken', `${data.access_token}`);
    return data;

  } catch (e) {
    console.log(e);
  }
}

export const getUserSpotify = async () => {
  try {
    const spotifyToken = localStorage.getItem('spotifyToken');
    const response = await clientAxios(spotifyToken).get(`https://api.spotify.com/v1/me`);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export async function spotifyApiCall(type, params) {

  const res = await axios.get(`${SPOTIFY_ACCOUNT}${apiType[type]}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}${params}`)
  const data = res.data;

  return data;
}
